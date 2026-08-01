/**
 * Initializes the MySQL database by executing schema.sql.
 * Run with: npm run db:init
 */
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

async function init() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    multipleStatements: true,
  });

  try {
    console.log("Connecting to MySQL and applying schema...");
    await connection.query(schemaSql);
    console.log("✅ Database schema applied successfully.");
  } catch (err) {
    console.error("❌ Failed to apply schema:", err.message);
    process.exitCode = 1;
  } finally {
    await connection.end();
  }
}

init();
