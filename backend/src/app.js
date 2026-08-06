const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "1mb" }));

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser tools (curl/postman) or matching frontend origins / vercel preview deployments
      if (
        !origin ||
        allowedOrigins.includes("*") ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Mediso API is running.",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      contact: "/api/contact",
      newsletter: "/api/newsletter",
      careers: "/api/careers",
      ai: "/api/ai",
    },
  });
});

app.use("/api", routes);
app.use(routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
