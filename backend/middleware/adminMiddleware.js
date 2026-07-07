// Middleware to restrict access to admin-only endpoints (e.g. the contact inbox)
// Access is granted by supplying the shared admin secret in an "x-admin-key" header.
// This keeps the inbox private without requiring changes to the existing User model.
const protectAdmin = (req, res, next) => {
  const suppliedKey = req.headers["x-admin-key"];
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    res.status(500);
    return next(new Error("Admin access is not configured on the server"));
  }

  if (!suppliedKey || suppliedKey !== adminSecret) {
    res.status(401);
    return next(new Error("Not authorized, admin access only"));
  }

  next();
};

module.exports = { protectAdmin };
