const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  getCurrentUser,
} = require("../../controllers/authController");
const { authMiddleware } = require("../../middleware/authMiddleware");
const uploadAvatar = require("../../middleware/upload");
const { updateAvatar } = require("../../controllers/uploadController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", authMiddleware, logout);
router.get("/current", authMiddleware, getCurrentUser);
router.patch("/avatars", authMiddleware, uploadAvatar, updateAvatar);

module.exports = router;
