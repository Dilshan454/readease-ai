const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { createWorker } = require("tesseract.js");

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([".pdf", ".docx", ".doc", ".txt", ".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tif", ".tiff"]);

async function extractText(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload one PDF, Word, TXT, or image file." });
  }

  const file = req.file;
  const extension = path.extname(file.originalname || "").toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return res.status(415).json({ message: "Unsupported file type. Use PDF, DOCX, TXT, PNG, JPG, WEBP, BMP, or TIFF." });
  }
  if (file.size > MAX_FILE_BYTES) {
    return res.status(413).json({ message: "File is too large. Maximum size is 10 MB." });
  }

  let worker;
  try {
    let text = "";
    if (extension === ".txt") {
      text = file.buffer.toString("utf8");
    } else if (extension === ".pdf") {
      const parsed = await pdfParse(file.buffer);
      text = parsed.text || "";
      if (!text.trim()) {
        return res.status(422).json({ message: "No selectable text was found in this PDF. If it is a scanned PDF, upload page images or add OCR for PDF pages." });
      }
    } else if (extension === ".docx") {
      const parsed = await mammoth.extractRawText({ buffer: file.buffer });
      text = parsed.value || "";
    } else if (extension === ".doc") {
      return res.status(415).json({ message: "Legacy .doc files are not supported yet. Please save the file as .docx and upload again." });
    } else {
      // OCR supports English, Sinhala and Tamil. Tesseract downloads language data on first use.
      worker = await createWorker("eng+sin+tam");
      const result = await worker.recognize(file.buffer);
      text = result.data.text || "";
    }

    text = String(text).replace(/\u0000/g, "").trim();
    if (!text) {
      return res.status(422).json({ message: "No readable text was found. Try a clearer image or a document containing text." });
    }
    return res.status(200).json({ message: "Text extracted successfully", fileName: file.originalname, text });
  } catch (error) {
    console.error("Text extraction error:", error);
    return res.status(500).json({ message: "Could not extract text from this file. Try another file or paste the text directly." });
  } finally {
    if (worker) {
      try { await worker.terminate(); } catch (_) { /* no-op */ }
    }
  }
}

module.exports = { extractText };
