const express=require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const readingSettingsRoutes = require("./routes/readingSettingsRoutes");
const lessonRoutes = require("./routes/lessonRoutes");

const app=express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/reading-settings", readingSettingsRoutes);
app.use("/api/lessons", lessonRoutes);

app.get("/",(req,res)=>{
    res.send("Dyslexia Assistive App Backend is Running");
});

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})