const fs = require('fs');
const pdfParse = require('pdf-parse');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// POST /api/documents/summarize
exports.summarizeDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF document' });
    }

    // 1. Read PDF & Extract Text
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;

    if (!extractedText || extractedText.trim().length === 0) {
      // Clean up uploaded temp file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'Could not extract text from the PDF' });
    }

    // 2. Call Gemini API to Summarize
    const prompt = `Please provide a clear, structured summary and key bullet points for the following text:\n\n${extractedText}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    // 3. Clean up local uploaded temp file
    fs.unlinkSync(req.file.path);

    // 4. Return Summary Result
    return res.status(200).json({
      success: true,
      summary: response.text,
      textLength: extractedText.length,
    });
  } catch (error) {
    console.error('Summarize Error:', error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ message: 'Error processing document summarization' });
  }
};