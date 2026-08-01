const { randomUUID } = require("crypto");
const { pool } = require("../config/db");
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
  await pool.query(
    `INSERT INTO career_applications
      (id, job_slug, job_title, name, email, phone, message, ai_summary, ai_fit_score, ai_highlights)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      jobSlug,
      jobTitle,
      name,
      email,
      phone || null,
      message,
      screening.summary || null,
      screening.fitScore ?? null,
      JSON.stringify(screening.highlights || []),
    ]
  );

  res.status(201).json({
    success: true,
    message: "Application submitted successfully.",
    applicationId: id,
    aiNote,
  });
});

module.exports = { apply };
