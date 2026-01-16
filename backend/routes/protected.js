const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/dashboard", auth, (req, res) => {
  res.json({
    msg: "Welcome to your Smart Daily Planner dashboard 🚀",
    userId: req.user
  });
});

module.exports = router;
