function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);

  // Supabase/Postgres unique-violation error code
  if (err.code === "23505") {
    return res.status(409).json({ success: false, message: "That record already exists." });
  }

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.expose ? err.message : status === 500 ? "Something went wrong on our end." : err.message,
  });
}

module.exports = { notFound, errorHandler };
