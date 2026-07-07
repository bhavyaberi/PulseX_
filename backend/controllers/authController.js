const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d"
  });
};

// Generate a random unique 6-character alphanumeric shareCode starting with 'PLX'
const generateUniqueShareCode = async () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let isUnique = false;
  let code = "";

  while (!isUnique) {
    code = "PLX";
    for (let i = 0; i < 3; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Verify code uniqueness in DB
    const existingUser = await User.findOne({ shareCode: code });
    if (!existingUser) {
      isUnique = true;
    }
  }
  return code;
};

// @desc    Register a new user (Athlete)
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please provide name, email, and password");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists with this email address");
    }

    // Generate unique shareCode
    const shareCode = await generateUniqueShareCode();

    // Create user in MongoDB
    const user = await User.create({
      name,
      email,
      password,
      shareCode
    });

    if (user) {
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          shareCode: user.shareCode,
          token: generateToken(user._id)
        }
      });
    } else {
      res.status(400);
      throw new Error("Invalid user details provided");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide email and password");
    }

    // Check if user email exists
    const user = await User.findOne({ email });

    // Validate password match
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        success: true,
        message: "Authentication successful",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          shareCode: user.shareCode,
          token: generateToken(user._id)
        }
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login
};
