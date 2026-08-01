const express = require("express");
const { body } = require("express-validator");
const rateLimit = require("express-rate-limit");
const validate = require("../middleware/validate");
const { optionalAuth } = require("../middleware/auth");
const { chat, status } = require("../controllers/aiController");

const router = express.Router();

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "You're sending messages too quickly. Please slow down." },
});

router.get("/status", status);

router.post(
  "/chat",
  chatLimiter,
  optionalAuth,
  [
    body("message").trim().isLength({ min: 1, max: 1000 }).withMessage("Message must be 1-1000 characters."),
    body("sessionId").optional().isString(),
  ],
  validate,
  chat
);

module.exports = router;
