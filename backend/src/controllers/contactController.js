const { randomUUID } = require("crypto");
const { supabase } = require("../config/supabase");
const asyncHandler = require("../utils/asyncHandler");
const { triageContactMessage, generateAcknowledgment } = require("../services/aiService");

const submitContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  const userId = req.user?.id || null;

  // AI triage: priority classification + one-line summary + suggested department
  const triage = await triageContactMessage({ subject, message });
  const aiNote = await generateAcknowledgment({ name, kind: "contact_message", topic: subject });

  const id = randomUUID();
  const { error } = await supabase.from("contact_submissions").insert({
    id,
    user_id: userId,
    name,
    email,
    subject,
    message,
    ai_priority: triage.priority || null,
    ai_summary: triage.summary || null,
    ai_suggested_department: triage.suggestedDepartment || null,
  });

  if (error) {
    throw new Error(`Failed to save contact submission: ${error.message}`);
  }

  res.status(201).json({
    success: true,
    message: "Your message has been received.",
    submissionId: id,
    aiNote,
    aiPriority: triage.priority,
  });
});

module.exports = { submitContact };
