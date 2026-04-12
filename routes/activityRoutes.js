const router = require("express").Router();
const Activity = require("../models/Activity");
const User = require("../models/User");

// Add activity
router.post("/", async (req, res) => {
  const activity = new Activity(req.body);
  await activity.save();

  await User.findByIdAndUpdate(req.body.userId, {
    $inc: { totalEmissions: req.body.emissions }
  });

  res.json(activity);
});

// Get user activities
router.get("/:userId", async (req, res) => {
  const data = await Activity.find({ userId: req.params.userId });
  res.json(data);
});

// Leaderboard
router.get("/leaderboard/all", async (req, res) => {
  const users = await User.find().sort({ totalEmissions: 1 });
  res.json(users);
});

module.exports = router;