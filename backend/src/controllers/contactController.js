const { randomUUID } = require("crypto");
const { pool } = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");
const { triageContactMessage, generateAcknowledgment } = require("../services/aiService");

const submitContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  const userId = req.user?.id || null;

  // AI triage: priority classification + one-line summary + suggested department
  const triage = await triageContactMessage({ subject, message });
  const aiNote = await generateAcknowledgment({ name, kind: "contact_message", topic: subject });

  const id = randomUUID();
  await pool.query(
    `INSERT INTO contact_submissions
      (id, user_id, name, email, subject, message, ai_priority, ai_summary, ai_suggested_department)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      userId,
      name,
      email,
      subject,
      message,
      triage.priority || null,
      triage.summary || null,
      triage.suggestedDepartment || null,
    ]
  );

  res.status(201).json({
    success: true,
    message: "Your message has been received.",
    submissionId: id,
    aiNote,
    aiPriority: triage.priority,
  });
});

module.exports = { submitContact };
