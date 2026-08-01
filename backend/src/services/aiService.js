const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const GEMINI_API_URL =
  process.env.GEMINI_API_URL ||
  `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent`;

function isAIEnabled() {
  return Boolean(GEMINI_API_KEY);
}

async function callGemini({ system, messages, maxTokens = 512 }) {
  if (!isAIEnabled()) {
    throw new Error("AI_DISABLED");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  let response;
  try {
    response = await fetch(`${GEMINI_API_URL}?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
      signal: controller.signal,
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: messages.map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      })),
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: 0.4,
      },
    }),
    });
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`Gemini API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim() || "";
  if (!text) {
    throw new Error("Empty Gemini response");
  }
  return text;
}

function tryParseJSON(text) {
  if (!text) return null;
  // Strip markdown code fences if the model wrapped the JSON in them
  const cleaned = text.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

// -----------------------------------------------------------------------
// 1. Health Assistant chat widget
// -----------------------------------------------------------------------
const HEALTH_ASSISTANT_SYSTEM_PROMPT = `You are the Mediso Health Assistant, a warm, concise virtual concierge for the Mediso healthcare platform.

Mediso's specialties (services): Pediatrics, Orthopedics, Gastroenterology, Neurology, Cardiology, General care.

Your job:
- Answer general health/wellness questions helpfully and briefly (2-5 sentences).
- When a user describes symptoms, suggest which Mediso specialty/service best matches and gently recommend they book an appointment via the Contact or Doctors page.
- NEVER provide a medical diagnosis, prescribe medication, or give specific dosing instructions.
- If the user describes an emergency (chest pain, difficulty breathing, severe bleeding, stroke symptoms, suicidal ideation, etc.), immediately and clearly tell them to call local emergency services right now, before anything else.
- Always make clear you are an AI assistant, not a doctor, and that responses are general information only.
- Keep responses short, friendly, and easy to scan. Avoid long paragraphs.`;

async function chatWithHealthAssistant(history) {
  // history: [{ role: 'user' | 'assistant', content: string }, ...]
  try {
    const reply = await callGemini({
      system: HEALTH_ASSISTANT_SYSTEM_PROMPT,
      messages: history,
      maxTokens: 400,
    });
    return { reply, aiPowered: true };
  } catch (err) {
    return { reply: fallbackAssistantReply(history), aiPowered: false };
  }
}

function fallbackAssistantReply(history) {
  const lastUserMsg = [...history].reverse().find((m) => m.role === "user");
  const text = (lastUserMsg?.content || "").toLowerCase();

  const emergencyKeywords = [
    "chest pain",
    "can't breathe",
    "cant breathe",
    "difficulty breathing",
    "severe bleeding",
    "suicide",
    "stroke",
    "unconscious",
  ];
  if (emergencyKeywords.some((k) => text.includes(k))) {
    return "⚠️ This sounds like it could be a medical emergency. Please call your local emergency number right away or go to the nearest emergency room. I'm an AI assistant and can't provide emergency care.";
  }

  const specialtyMap = [
    { keywords: ["heart", "chest", "palpitation", "blood pressure"], service: "Cardiology" },
    { keywords: ["joint", "bone", "fracture", "back pain", "knee", "shoulder"], service: "Orthopedics" },
    { keywords: ["stomach", "digest", "nausea", "acid reflux", "bowel"], service: "Gastroenterology" },
    { keywords: ["headache", "migraine", "dizziness", "numbness", "seizure"], service: "Neurology" },
    { keywords: ["child", "kid", "infant", "toddler", "baby"], service: "Pediatrics" },
  ];
  const match = specialtyMap.find((s) => s.keywords.some((k) => text.includes(k)));

  if (match) {
    return `Thanks for sharing that. Based on what you've described, our ${match.service} team would be a great place to start. I'm an AI assistant (not a doctor) so this isn't a diagnosis — I'd recommend booking an appointment through our Contact page so a specialist can properly assess you.`;
  }

  return "Thanks for reaching out! I'm the Mediso Health Assistant. I can share general wellness information and point you to the right specialist. Could you tell me a bit more about what you're experiencing? (Note: I'm an AI, not a doctor, and can't diagnose conditions.)";
}

// -----------------------------------------------------------------------
// 2. Contact-form triage
// -----------------------------------------------------------------------
async function triageContactMessage({ subject, message }) {
  const fallback = ruleBasedTriage({ subject, message });
  try {
    const raw = await callGemini({
      system: `You triage inbound patient contact-form messages for a healthcare clinic. Respond ONLY with strict JSON, no prose, no markdown fences, matching exactly this shape:
{"priority": "low" | "medium" | "high" | "emergency", "summary": "one sentence <= 25 words summarizing the request", "suggestedDepartment": "short department/specialty name"}`,
      messages: [
        {
          role: "user",
          content: `Subject: ${subject}\nMessage: ${message}`,
        },
      ],
      maxTokens: 200,
    });
    const parsed = tryParseJSON(raw);
    if (parsed && parsed.priority && parsed.summary) {
      return { ...parsed, aiPowered: true };
    }
    return { ...fallback, aiPowered: false };
  } catch {
    return { ...fallback, aiPowered: false };
  }
}

function ruleBasedTriage({ subject, message }) {
  const text = `${subject} ${message}`.toLowerCase();
  const emergencyKeywords = ["emergency", "severe pain", "chest pain", "can't breathe", "bleeding heavily"];
  const highKeywords = ["urgent", "asap", "billing dispute", "medication error", "allergic reaction"];

  let priority = "low";
  if (emergencyKeywords.some((k) => text.includes(k))) priority = "emergency";
  else if (highKeywords.some((k) => text.includes(k))) priority = "high";
  else if (subject.toLowerCase().includes("appointment")) priority = "medium";

  return {
    priority,
    summary: message.length > 140 ? `${message.slice(0, 137)}...` : message,
    suggestedDepartment: subject || "General Inquiry",
  };
}

// -----------------------------------------------------------------------
// 3. Career application screening
// -----------------------------------------------------------------------
async function screenCareerApplication({ jobTitle, requirements = [], applicantMessage }) {
  try {
    const raw = await callGemini({
      system: `You are an HR screening assistant. Respond ONLY with strict JSON, no prose, no markdown fences, matching exactly:
{"fitScore": <integer 0-100>, "summary": "one or two sentence recruiter-facing summary", "highlights": ["short bullet", "short bullet", "short bullet"]}
Base the assessment only on the applicant's cover message relative to the role's requirements. Be fair and unbiased; do not infer protected characteristics.`,
      messages: [
        {
          role: "user",
          content: `Role: ${jobTitle}\nRequirements: ${requirements.join("; ")}\nApplicant message: ${applicantMessage}`,
        },
      ],
      maxTokens: 300,
    });
    const parsed = tryParseJSON(raw);
    if (parsed && typeof parsed.fitScore === "number") {
      return { ...parsed, aiPowered: true };
    }
    throw new Error("bad_json");
  } catch {
    return {
      fitScore: null,
      summary: "Application received and queued for manual review by our recruiting team.",
      highlights: [],
      aiPowered: false,
    };
  }
}

// -----------------------------------------------------------------------
// 4. Personalized acknowledgement notes (contact form / career apply)
// -----------------------------------------------------------------------
async function generateAcknowledgment({ name, kind, topic }) {
  const firstName = (name || "there").split(" ")[0];
  try {
    const raw = await callGemini({
      system:
        "Write exactly one short, warm, professional sentence (max 30 words) acknowledging a patient's/applicant's submission to a healthcare clinic called Mediso. No greeting salutations like 'Dear', no sign-off, just the sentence itself.",
      messages: [
        {
          role: "user",
          content: `Name: ${firstName}\nSubmission type: ${kind}\nTopic: ${topic || "N/A"}`,
        },
      ],
      maxTokens: 80,
    });
    return raw || defaultAcknowledgment(firstName, kind);
  } catch {
    return defaultAcknowledgment(firstName, kind);
  }
}

function defaultAcknowledgment(firstName, kind) {
  if (kind === "career_application") {
    return `Thanks, ${firstName} — your application has been received and our recruiting team will review it shortly.`;
  }
  return `Thanks, ${firstName} — we've received your message and a member of our care team will follow up soon.`;
}

module.exports = {
  isAIEnabled,
  chatWithHealthAssistant,
  triageContactMessage,
  screenCareerApplication,
  generateAcknowledgment,
};
