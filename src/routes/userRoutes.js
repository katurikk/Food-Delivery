const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authmiddleware");

// Existing CRUD routes for users
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// ✅ New: Auth routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// ✅ New: Protected profile route
router.get("/profile", authMiddleware, userController.getProfile);

module.exports = router;
