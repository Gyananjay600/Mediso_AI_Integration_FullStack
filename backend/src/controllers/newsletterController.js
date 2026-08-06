const { randomUUID } = require("crypto");
const { supabase } = require("../config/supabase");
const asyncHandler = require("../utils/asyncHandler");

const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if already subscribed
  const { data: existing, error: selectError } = await supabase
    .from("newsletter_subscribers")
    .select("id")
    .eq("email", email.toLowerCase())
    .limit(1);

  if (selectError) {
    throw new Error(`Newsletter lookup failed: ${selectError.message}`);
  }

  if (existing && existing.length > 0) {
    return res.json({ success: true, message: "You're already subscribed!" });
  }

  const { error: insertError } = await supabase.from("newsletter_subscribers").insert({
    id: randomUUID(),
    email: email.toLowerCase(),
  });

  if (insertError) {
    throw new Error(`Newsletter subscribe failed: ${insertError.message}`);
  }

  res.status(201).json({ success: true, message: "Thanks for subscribing!" });
});

module.exports = { subscribe };
