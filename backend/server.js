require("dotenv").config();
const app = require("./src/app");
const { testConnection } = require("./src/config/supabase");

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Mediso API listening on http://localhost:${PORT}`);
  await testConnection();
  if (!process.env.GEMINI_API_KEY) {
    console.log(
      "ℹ️  GEMINI_API_KEY not set — AI features will use safe rule-based fallbacks. Add it to .env to enable full AI responses."
    );
  }
});
