const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: String,
  type: String,
  emissions: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Activity", activitySchema);