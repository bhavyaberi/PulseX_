// Custom error handler middleware
const errorHandler = (err, req, res, next) => {
  // If status is 200, but an error occurred, set code to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
};

module.exports = { errorHandler };
