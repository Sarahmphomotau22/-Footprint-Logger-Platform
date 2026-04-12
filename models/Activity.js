const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  type: String,
  value: Number,
  emissions: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Activity", activitySchema);