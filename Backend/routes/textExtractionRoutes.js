const express = require("express");
const multer = require("multer");
const { extractText } = require("../controllers/textExtractionController");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
});

router.post("/extract", (req, res, next) => {
  upload.single("file")(req, res, (error) => {
    if (error) {
      const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
      return res.status(status).json({ message: error.code === "LIMIT_FILE_SIZE" ? "File is too large. Maximum size is 10 MB." : "Could not upload file." });
    }
    next();
  });
}, extractText);

module.exports = router;
