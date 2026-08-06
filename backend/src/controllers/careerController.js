const { randomUUID } = require("crypto");
const { supabase } = require("../config/supabase");
const asyncHandler = require("../utils/asyncHandler");
const { screenCareerApplication, generateAcknowledgment } = require("../services/aiService");

const apply = asyncHandler(async (req, res) => {
  const { jobSlug, jobTitle, name, email, phone, message, requirements } = req.body;

  const screening = await screenCareerApplication({
    jobTitle,
    requirements: Array.isArray(requirements) ? requirements : [],
    applicantMessage: message,
  });
  const aiNote = await generateAcknowledgment({ name, kind: "career_application", topic: jobTitle });

  const id = randomUUID();
  const { error } = await supabase.from("career_applications").insert({
    id,
    job_slug: jobSlug,
    job_title: jobTitle,
    name,
    email,
    phone: phone || null,
    message,
    ai_summary: screening.summary || null,
    ai_fit_score: screening.fitScore ?? null,
    ai_highlights: screening.highlights || [],
  });

  if (error) {
    throw new Error(`Failed to save career application: ${error.message}`);
  }

  res.status(201).json({
    success: true,
    message: "Application submitted successfully.",
    applicationId: id,
    aiNote,
  });
});

module.exports = { apply };
