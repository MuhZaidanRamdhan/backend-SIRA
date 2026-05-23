const express = require("express");
const router = express.Router();

const mataKuliahController = require("../controllers/mataKuliahController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.get("/roadmap", authenticateToken, mataKuliahController.getRoadmap);

module.exports = router;
