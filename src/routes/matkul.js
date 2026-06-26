const express = require("express");
const router = express.Router();

const mataKuliahController = require("../controllers/mataKuliahController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.get("/roadmap", authenticateToken, mataKuliahController.getRoadmap);

router.get("/", authenticateToken, mataKuliahController.getAllCourses);

router.get("/:id", authenticateToken, mataKuliahController.getCourseById);

router.post("/", authenticateToken, mataKuliahController.createCourse);

router.put("/:id", authenticateToken, mataKuliahController.updateCourse);

router.delete("/:id", authenticateToken, mataKuliahController.deleteCourse);

module.exports = router;
