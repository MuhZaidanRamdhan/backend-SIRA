const express = require("express");
const router = express.Router();

const logController = require("../controllers/logController");

const { authenticateToken } = require("../middlewares/authMiddleware");

router.get("/logs", authenticateToken, logController.getLogs);

module.exports = router;
