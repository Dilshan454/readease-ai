const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    simplifyText,
    generateExercises
} = require("../controllers/aiController");

const router = express.Router();

router.post("/simplify", protect, simplifyText);
router.post("/generate-exercises", protect, generateExercises);

module.exports = router;