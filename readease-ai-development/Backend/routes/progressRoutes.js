const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    createProgress,
    getMyProgress
} = require("../controllers/progressController");

const router = express.Router();

router.post("/", protect, createProgress);
router.get("/", protect, getMyProgress);

module.exports = router;