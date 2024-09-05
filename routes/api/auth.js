const express = require("express");
const router = express.Router();
const { signup, login, logout, getCurrentUser } = require("../../controllers/authController");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", authMiddleware, logout); 
router.get("/current", authMiddleware, getCurrentUser); 

module.exports = router;