const express = require('express');
const router = express.Router();
const multer = require('multer');
const { summarizeDocument } = require('../controllers/documentController');

// Temp storage for file uploads
const upload = multer({ dest: 'uploads/' });

// POST /api/documents/summarize
router.post('/summarize', upload.single('document'), summarizeDocument);

module.exports = router;