const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    simplifyText,
    generateExercises,
    generateSummary,
    generateConversation
} = require("../controllers/aiController");

const router = express.Router();

router.post("/simplify", protect, simplifyText);
router.post("/generate-exercises", protect, generateExercises);
router.post("/generate-summary", protect, generateSummary);
router.post("/generate-conversation", protect, generateConversation);

module.exports = router;