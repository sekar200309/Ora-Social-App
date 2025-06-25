const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware"); // or your auth file

// Sample protected route
router.get("/profile", authenticate, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err });
  }
});

module.exports = router;
