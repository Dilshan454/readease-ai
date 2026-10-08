const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    createExercise,
    getExercises
} = require("../controllers/exerciseController");

const router = express.Router();

router.post("/", protect, createExercise);
router.get("/", protect, getExercises);

module.exports = router;