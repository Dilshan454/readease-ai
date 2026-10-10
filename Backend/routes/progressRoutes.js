
const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    createProgress,
    getMyProgress,
    getMyProgressSummary
} = require("../controllers/progressController");

const router = express.Router();

router.post("/", protect, createProgress);

router.get("/", protect, getMyProgress);

router.get("/summary", protect, getMyProgressSummary);

module.exports = router;
