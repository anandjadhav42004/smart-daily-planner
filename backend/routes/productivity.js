const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/Task");

const moodFactor = {
  happy: 1.2,
  neutral: 1.0,
  tired: 0.8,
  stressed: 0.6
};

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });

    if (tasks.length === 0) {
      return res.json({ productivityScore: 0 });
    }

    const completed = tasks.filter(t => t.completed).length;
    const avgMood =
      tasks.reduce((sum, t) => sum + (moodFactor[t.mood] || 1), 0) / tasks.length;

    const score = Math.round((completed / tasks.length) * avgMood * 100);

    res.json({
      totalTasks: tasks.length,
      completedTasks: completed,
      productivityScore: score
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
