
const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const readingSettingsRoutes = require("./routes/readingSettingsRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const progressRoutes = require("./routes/progressRoutes");
const aiRoutes = require("./routes/aiRoutes");
const phoneticRoutes = require("./routes/phoneticRoutes");
const gamificationRoutes = require("./routes/gamificationRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");


const textExtractionRoutes = require("./routes/textExtractionRoutes");


const languageRoutes = require("./routes/languageRoutes");
const documentRoutes = require('./routes/documentRoutes');

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/reading-settings", readingSettingsRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/phonetic", phoneticRoutes);
app.use("/api/gamification", gamificationRoutes);
app.use("/api/recommendations", recommendationRoutes);


app.use("/api/text-extraction", textExtractionRoutes);
app.use("/api/language", languageRoutes);
app.use('/api/documents', documentRoutes);

app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, language } = req.body;

    let reply = "I am here to help you practice reading and improve your vocabulary!";

    if (language === 'sinhala') {
      reply = "ඔබගේ කියවීමේ ප්‍රගතිය සහ වචන උච්චාරණය වැඩිදියුණු කිරීමට මට උපකාර කළ හැක!";
    } else if (language === 'tamil') {
      reply = "உங்கள் வாசிப்பு மற்றும் உச்சரிப்பை மேம்படுத்த நான் உதவுகிறேன்!";
    }

    res.json({ success: true, reply });
  } catch (error) {
    console.error("AI Chat Server Error:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

app.get("/", (req, res) => {
    res.send("Dyslexia Assistive App Backend is Running");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
