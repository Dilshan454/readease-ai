
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getLanguage,
    updateLanguage
} = require("../controllers/languageController");


router.get("/", protect, getLanguage);


router.put("/", protect, updateLanguage);

module.exports = router;
