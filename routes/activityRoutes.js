const router = require("express").Router();
const Activity = require("../models/Activity");
const User = require("../models/User");
const mongoose = require("mongoose");

// ✅ ALL specific routes MUST come before /:userId

// Leaderboard
router.get("/leaderboard/all", async (req, res) => {
  try {
    const users = await User.find().sort({ totalEmissions: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Weekly
router.get("/weekly/summary", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }

    const data = await Activity.find({
      userId: new mongoose.Types.ObjectId(userId),
      date: { $gte: oneWeekAgo }
    });

    res.json(data);
  } catch (err) {
    console.error("Weekly error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Get user activities — /:userId MUST be last
router.get("/:userId", async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    const data = await Activity.find({ userId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add activity
router.post("/", async (req, res) => {
  try {
    console.log("Adding activity:", req.body);

    const { userId, type, emissions } = req.body;

    if (!userId || !type || emissions === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const activity = new Activity({
      userId: new mongoose.Types.ObjectId(userId),
      type,
      emissions: parseFloat(emissions)
    });

    await activity.save();

    await User.findByIdAndUpdate(userId, {
      $inc: { totalEmissions: parseFloat(emissions) }
    });

    res.json(activity);

  } catch (err) {
    console.error("Add activity error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;