const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://sarahmphomotau22_db_user:Gau070918@cluster0.4yxjekd.mongodb.net/footprintLogger?retryWrites=true&w=majority")
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ Connection error:", err));

app.get("/test", (req, res) => {
  res.send("MongoDB Atlas connection is working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
