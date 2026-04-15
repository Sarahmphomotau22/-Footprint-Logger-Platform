require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//mongoose.connect(process.env.MONGO_URI)
//  .then(() => console.log("MongoDB Connected ✅"))
//  .catch(err => console.log("❌ Connection error:", err.message));
// MongoDB configuration
const DB_URL = process.env.MONGO_URI; 
mongoose.connect(DB_URL);
const conn = mongoose.connection;
conn.once('open', () => {
    console.log('✅ Successfully connected to database');
});
conn.on('error', (err) => {
    console.error('❌ Failed to connect to database:', err);
});


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/activities", require("./routes/activityRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));