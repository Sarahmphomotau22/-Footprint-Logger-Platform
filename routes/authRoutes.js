const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "Registered" });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || user.password !== req.body.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      token: "dummy-token",
      name: user.name
    });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;