const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

// Authentication Route Bindings
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
