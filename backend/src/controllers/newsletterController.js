const { randomUUID } = require("crypto");
const { pool } = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");

const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const [existing] = await pool.query(
    "SELECT id FROM newsletter_subscribers WHERE email = ? LIMIT 1",
    [email.toLowerCase()]
  );
  if (existing.length > 0) {
    return res.json({ success: true, message: "You're already subscribed!" });
  }

  await pool.query("INSERT INTO newsletter_subscribers (id, email) VALUES (?, ?)", [
    randomUUID(),
    email.toLowerCase(),
  ]);

  res.status(201).json({ success: true, message: "Thanks for subscribing!" });
});

module.exports = { subscribe };
