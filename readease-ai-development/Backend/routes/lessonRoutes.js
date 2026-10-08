const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    createLesson,
    getLessons
} = require("../controllers/lessonController");

const router = express.Router();

router.post("/", protect, createLesson);
router.get("/", protect, getLessons);

module.exports = router;