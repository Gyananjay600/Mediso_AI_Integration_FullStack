const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const isConfigured = Boolean(supabaseUrl && supabaseServiceKey);

if (!isConfigured) {
  console.error(
    "⚠️  SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required. Add them to .env from your Supabase Dashboard → Settings → API."
  );
}

// Use the service-role key on the backend so we bypass RLS for server-side operations.
// We create the client with a placeholder URL if not configured, so the app can at least boot
// and show a helpful error message instead of crashing on startup.
const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseServiceKey || "placeholder-key",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

async function testConnection() {
  if (!isConfigured) {
    console.error("❌ Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.");
    return;
  }
  try {
    const { error } = await supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true });
    if (error) throw error;
    console.log("✅ Supabase connected successfully.");
  } catch (err) {
    console.error("❌ Supabase connection failed:", err.message);
    console.error(
      "   Make sure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set correctly in .env, and that the schema has been applied."
    );
  }
}

module.exports = { supabase, testConnection };
