const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  updateProfile,
} = require("../controllers/userController");

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticatedUser, getUserDetails);
router.route("/profile/photo").post(isAuthenticatedUser, updateProfile);


module.exports = router;
