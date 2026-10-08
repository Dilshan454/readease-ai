const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    getReadingSettings,
    createReadingSettings,
    updateReadingSettings
} = require("../controllers/readingSettingsController");

const router = express.Router();

router.get("/", protect, getReadingSettings);
router.post("/", protect, createReadingSettings);
router.put("/", protect, updateReadingSettings);

module.exports = router;