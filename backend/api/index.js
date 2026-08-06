// Vercel serverless function entry point.
// The local server continues to use server.js; Vercel imports the Express app.
require("dotenv").config();

const app = require("../src/app");

module.exports = app;
