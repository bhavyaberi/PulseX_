const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes and verify JWT tokens
const protect = async (req, res, next) => {
  let token;

  // Check if Bearer token is sent in headers authorization
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token from Bearer <token>
      token = req.headers.authorization.split(" ")[1];

      // Decode and verify token using JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach matching user to req.user object (exclude password hash)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("User not found, authorization failed");
      }

      next();
    } catch (error) {
      console.error(`Auth Middleware Error: ${error.message}`);
      res.status(401);
      return next(new Error("Not authorized, token validation failed"));
    }
  }

  if (!token) {
    res.status(401);
    return next(new Error("Not authorized, no session token provided"));
  }
};

module.exports = { protect };
