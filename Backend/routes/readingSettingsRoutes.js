const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    getReadingSettings,
    createReadingSettings
} = require("../controllers/readingSettingsController");

const router = express.Router();

router.get("/", protect, getReadingSettings);
router.post("/", protect, createReadingSettings);

module.exports = router;