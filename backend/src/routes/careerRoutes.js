const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { apply } = require("../controllers/careerController");

const router = express.Router();

router.post(
  "/apply",
  [
    body("jobSlug").trim().notEmpty().withMessage("jobSlug is required."),
    body("jobTitle").trim().notEmpty().withMessage("jobTitle is required."),
    body("name").trim().notEmpty().withMessage("Name is required."),
    body("email").trim().isEmail().withMessage("A valid email is required.").normalizeEmail(),
    body("message").trim().notEmpty().withMessage("Message is required."),
  ],
  validate,
  apply
);

module.exports = router;
