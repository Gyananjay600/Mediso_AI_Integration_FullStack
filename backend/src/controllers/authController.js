const { randomUUID } = require("crypto");
const bcrypt = require("bcryptjs");
const { pool } = require("../config/db");
const { signToken } = require("../utils/jwt");
const asyncHandler = require("../utils/asyncHandler");

function toPublicUser(row) {
  return { id: row.id, name: row.name, email: row.email };
}

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const [existing] = await pool.query("SELECT id FROM users WHERE email = ? LIMIT 1", [
    email.toLowerCase(),
  ]);
  if (existing.length > 0) {
    return res.status(409).json({ success: false, message: "An account with this email already exists." });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const id = randomUUID();

  await pool.query(
    "INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)",
    [id, name, email.toLowerCase(), passwordHash]
  );

  const user = { id, name, email: email.toLowerCase() };
  const token = signToken({ id: user.id, email: user.email });

  res.status(201).json({ success: true, token, user });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [
    email.toLowerCase(),
  ]);
  const row = rows[0];
  if (!row) {
    return res.status(401).json({ success: false, message: "Invalid email or password." });
  }

  const isMatch = await bcrypt.compare(password, row.password_hash);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Invalid email or password." });
  }

  const user = toPublicUser(row);
  const token = signToken({ id: user.id, email: user.email });

  res.json({ success: true, token, user });
});

const me = asyncHandler(async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ? LIMIT 1", [req.user.id]);
  const row = rows[0];
  if (!row) {
    return res.status(404).json({ success: false, message: "User not found." });
  }
  res.json({ success: true, user: toPublicUser(row) });
});

module.exports = { register, login, me };
