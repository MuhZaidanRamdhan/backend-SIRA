const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const { authenticateToken } = require("../middlewares/authMiddleware");

const { isAdmin } = require("../middlewares/roleMiddleware");

router.get("/users", authenticateToken, isAdmin, userController.getAllUsers);

router.get("/users-management", authenticateToken, isAdmin, userController.getAllUsersWithPagination);
module.exports = router;
