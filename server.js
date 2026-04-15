require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://sarahmphomotau22_db_user:Orifha0709@cluster0.4yxjekd.mongodb.net/footprint?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected "))
  .catch(err => console.log("Connection error:", err.message));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/activities", require("./routes/activityRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));