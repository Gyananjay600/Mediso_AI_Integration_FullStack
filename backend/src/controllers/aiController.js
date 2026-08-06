const { randomUUID } = require("crypto");
const { supabase } = require("../config/supabase");
const asyncHandler = require("../utils/asyncHandler");
const { chatWithHealthAssistant, isAIEnabled } = require("../services/aiService");

const MAX_HISTORY_MESSAGES = 12;

const chat = asyncHandler(async (req, res) => {
  const { message, sessionId: incomingSessionId } = req.body;
  const userId = req.user?.id || null;

  let sessionId = incomingSessionId;
  if (!sessionId) {
    sessionId = randomUUID();
    const { error } = await supabase.from("ai_chat_sessions").insert({ id: sessionId, user_id: userId });
    if (error) throw new Error(`Failed to create chat session: ${error.message}`);
  } else {
    // Verify session exists, create if not
    const { data: existing, error: selectError } = await supabase
      .from("ai_chat_sessions")
      .select("id")
      .eq("id", sessionId)
      .limit(1);

    if (selectError) throw new Error(`Session lookup failed: ${selectError.message}`);

    if (!existing || existing.length === 0) {
      const { error: insertError } = await supabase
        .from("ai_chat_sessions")
        .insert({ id: sessionId, user_id: userId });
      if (insertError) throw new Error(`Failed to create chat session: ${insertError.message}`);
    }
  }

  // Persist the user's message
  const { error: userMsgError } = await supabase.from("ai_chat_messages").insert({
    id: randomUUID(),
    session_id: sessionId,
    role: "user",
    content: message,
  });
  if (userMsgError) throw new Error(`Failed to save user message: ${userMsgError.message}`);

  // Pull recent history for context
  const { data: historyRows, error: historyError } = await supabase
    .from("ai_chat_messages")
    .select("role, content")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
    .limit(MAX_HISTORY_MESSAGES);

  if (historyError) throw new Error(`Failed to load chat history: ${historyError.message}`);

  const history = (historyRows || []).map((r) => ({ role: r.role, content: r.content }));

  const { reply, aiPowered } = await chatWithHealthAssistant(history);

  // Persist the assistant's reply
  const { error: assistantMsgError } = await supabase.from("ai_chat_messages").insert({
    id: randomUUID(),
    session_id: sessionId,
    role: "assistant",
    content: reply,
  });
  if (assistantMsgError) throw new Error(`Failed to save assistant message: ${assistantMsgError.message}`);

  res.json({ success: true, sessionId, reply, aiPowered });
});

const status = asyncHandler(async (req, res) => {
  res.json({ success: true, aiEnabled: isAIEnabled() });
});

module.exports = { chat, status };
