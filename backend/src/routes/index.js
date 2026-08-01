const express = require("express");
const authRoutes = require("./authRoutes");
const contactRoutes = require("./contactRoutes");
const newsletterRoutes = require("./newsletterRoutes");
const careerRoutes = require("./careerRoutes");
const aiRoutes = require("./aiRoutes");

const router = express.Router();

router.get("/health", (req, res) => res.json({ success: true, message: "Mediso API is running." }));

router.use("/auth", authRoutes);
router.use("/contact", contactRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/careers", careerRoutes);
router.use("/ai", aiRoutes);

module.exports = router;
