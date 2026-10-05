const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    getGamificationResult
} = require("../controllers/gamificationController");

const router = express.Router();

router.post(
    "/calculate",
    protect,
    getGamificationResult
);

module.exports = router;