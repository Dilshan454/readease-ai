const express = require("express");
const protect = require("../middleware/authMiddleware");

const { simplifyText } = require("../controllers/aiController");

const router = express.Router();

router.post("/simplify", protect, simplifyText);

module.exports = router;