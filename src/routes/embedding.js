const express = require("express");
const router = express.Router();

const embeddingController = require("../controllers/embeddingController");

const { authenticateToken } = require("../middlewares/authMiddleware");

const { isAdmin } = require("../middlewares/roleMiddleware");

router.post(
  "/sync-embedding",
  authenticateToken,
  isAdmin,
  embeddingController.syncEmbedding,
);

router.get(
  "/embedding-status",
  authenticateToken,
  isAdmin,
  embeddingController.getEmbeddingStatus,
);

module.exports = router;
