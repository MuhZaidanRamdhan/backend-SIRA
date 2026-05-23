const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/authMiddleware");

// Register user
router.post("/register", authController.register);

// Login user (username/email)
router.post("/login", authController.login);

router.post("/logout", authenticateToken, authController.logout);

module.exports = router;
