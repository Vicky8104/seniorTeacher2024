const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const {
  loginUser,
  getUser,
  getSchools,
  submitSchools,
  submitFinalForm
} = require("../controllers/authController");

// LOGIN
router.post("/login", loginUser);

router.get("/user", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    res.json({ user });  // 🔥 IMPORTANT

  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
});


// GET SCHOOLS
router.get("/schools", verifyToken, getSchools);

// SAVE SCHOOLS
router.post("/schools", submitSchools);

// FINAL SUBMIT

router.post("/submit", verifyToken, submitFinalForm);

module.exports = router;

