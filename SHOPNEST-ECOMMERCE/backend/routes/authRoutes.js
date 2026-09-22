const express = require("express");
const { registerUser, loginUser, getUsers } = require("../controllers/authController");
const {protect} = require("../middlewares/authMiddleware");
const {admin} = require("../middlewares/adminMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, admin, getUsers);


module.exports = router;