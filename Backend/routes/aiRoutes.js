const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    simplifyText,
    generateExercises,
    generateSummary
} = require("../controllers/aiController");

const router = express.Router();

router.post("/simplify", protect, simplifyText);
router.post("/generate-exercises", protect, generateExercises);
router.post("/generate-summary", protect, generateSummary);

module.exports = router;