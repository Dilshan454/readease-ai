const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    getPhonetic
} = require("../controllers/phoneticController");

const router = express.Router();

router.post("/generate", protect, getPhonetic);

module.exports = router;