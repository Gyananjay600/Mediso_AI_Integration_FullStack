const { supabase } = require("../config/supabase");
const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const { data, error } = await supabase.auth.admin.createUser({
    email: email.toLowerCase(),
    password,
    email_confirm: true,
    user_metadata: { name },
  });

  if (error) {
    // Supabase returns a specific message for duplicate emails
    if (error.message.toLowerCase().includes("already been registered") || error.status === 422) {
      return res.status(409).json({ success: false, message: "An account with this email already exists." });
    }
    return res.status(400).json({ success: false, message: error.message });
  }

  // Sign in immediately to get an access token
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password,
  });

  if (signInError) {
    return res.status(500).json({ success: false, message: "Account created but auto-login failed. Please log in manually." });
  }

  const user = {
    id: data.user.id,
    name: data.user.user_metadata?.name || name,
    email: data.user.email,
  };

  res.status(201).json({
    success: true,
    token: signInData.session.access_token,
    user,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password,
  });

  if (error) {
    return res.status(401).json({ success: false, message: "Invalid email or password." });
  }

  const user = {
    id: data.user.id,
    name: data.user.user_metadata?.name || "",
    email: data.user.email,
  };

  res.json({
    success: true,
    token: data.session.access_token,
    user,
  });
});

const me = asyncHandler(async (req, res) => {
  // req.user is set by the auth middleware
  res.json({
    success: true,
    user: {
      id: req.user.id,
      name: req.user.user_metadata?.name || "",
      email: req.user.email,
    },
  });
});

module.exports = { register, login, me };
