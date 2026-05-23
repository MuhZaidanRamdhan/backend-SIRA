const express = require("express");
const router = express.Router();

const { recommendCourse } = require("../controllers/recommendationController");

const { authenticateToken } = require("../middlewares/authMiddleware");

// const { isAdmin } = require("../middlewares/roleMiddleware");

router.post("/recommend", authenticateToken, recommendCourse);

module.exports = router;
