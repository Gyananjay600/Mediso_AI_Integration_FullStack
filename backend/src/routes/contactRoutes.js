const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { optionalAuth } = require("../middleware/auth");
const { submitContact } = require("../controllers/contactController");

const router = express.Router();

router.post(
  "/",
  optionalAuth,
  [
    body("name").trim().notEmpty().withMessage("Name is required."),
    body("email").trim().isEmail().withMessage("A valid email is required.").normalizeEmail(),
    body("subject").trim().notEmpty().withMessage("Subject is required."),
    body("message").trim().isLength({ min: 1, max: 500 }).withMessage("Message must be 1-500 characters."),
  ],
  validate,
  submitContact
);

module.exports = router;
