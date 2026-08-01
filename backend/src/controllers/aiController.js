const { randomUUID } = require("crypto");
const { pool } = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");
const { chatWithHealthAssistant, isAIEnabled } = require("../services/aiService");

const MAX_HISTORY_MESSAGES = 12;

const chat = asyncHandler(async (req, res) => {
  const { message, sessionId: incomingSessionId } = req.body;
  const userId = req.user?.id || null;

  let sessionId = incomingSessionId;
  if (!sessionId) {
    sessionId = randomUUID();
    await pool.query("INSERT INTO ai_chat_sessions (id, user_id) VALUES (?, ?)", [sessionId, userId]);
  } else {
    const [rows] = await pool.query("SELECT id FROM ai_chat_sessions WHERE id = ? LIMIT 1", [sessionId]);
    if (rows.length === 0) {
      await pool.query("INSERT INTO ai_chat_sessions (id, user_id) VALUES (?, ?)", [sessionId, userId]);
    }
  }

  // Persist the user's message
  await pool.query(
    "INSERT INTO ai_chat_messages (id, session_id, role, content) VALUES (?, ?, 'user', ?)",
    [randomUUID(), sessionId, message]
  );

  // Pull recent history for context
  const [historyRows] = await pool.query(
    "SELECT role, content FROM ai_chat_messages WHERE session_id = ? ORDER BY created_at ASC LIMIT ?",
    [sessionId, MAX_HISTORY_MESSAGES]
  );
  const history = historyRows.map((r) => ({ role: r.role, content: r.content }));

  const { reply, aiPowered } = await chatWithHealthAssistant(history);

  await pool.query(
    "INSERT INTO ai_chat_messages (id, session_id, role, content) VALUES (?, ?, 'assistant', ?)",
    [randomUUID(), sessionId, reply]
  );

  res.json({ success: true, sessionId, reply, aiPowered });
});

const status = asyncHandler(async (req, res) => {
  res.json({ success: true, aiEnabled: isAIEnabled() });
});

module.exports = { chat, status };
