const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://sarahmphomotau22_db_user:Gau070918@cluster0.4yxjekd.mongodb.net/footprintLogger?retryWrites=true&w=majority")
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ Connection error:", err));

// Middleware (optional, for JSON parsing)
app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.send("MongoDB Atlas connection is working!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
