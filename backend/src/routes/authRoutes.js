const express = require("express");
const { body } = require("express-validator");
const rateLimit = require("express-rate-limit");
const validate = require("../middleware/validate");
const { requireAuth } = require("../middleware/auth");
const { register, login, me } = require("../controllers/authController");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many attempts. Please try again later." },
});

router.post(
  "/register",
  authLimiter,
  [
    body("name").trim().notEmpty().withMessage("Name is required."),
    body("email").trim().isEmail().withMessage("A valid email is required.").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),
  ],
  validate,
  register
);

router.post(
  "/login",
  authLimiter,
  [
    body("email").trim().isEmail().withMessage("A valid email is required.").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  validate,
  login
);

router.get("/me", requireAuth, me);

module.exports = router;
