const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const uploadController = require("../controllers/silabusController");

const { authenticateToken } = require("../middlewares/authMiddleware");

const { isAdmin } = require("../middlewares/roleMiddleware");

router.post(
  "/upload-silabus",
  authenticateToken,
  isAdmin,
  upload.single("file"),
  uploadController.uploadSilabus,
);

module.exports = router;
