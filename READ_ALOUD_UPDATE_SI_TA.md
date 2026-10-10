# ReadEase AI: upload/paste and read aloud (English, Sinhala, Tamil)

## What changed
- The Reading screen now lets a user paste a paragraph or choose a PDF, DOCX, TXT, or image file.
- Extracted/pasted text appears in the reading card and is passed to the existing Expo Speech read-aloud action.
- The backend extracts selectable PDF text, DOCX text, TXT text, and OCR text from images. OCR is configured for `eng+sin+tam`.
- File processing uses in-memory uploads with a 10 MB limit; uploaded files are not saved to disk.
- Existing sample paragraphs, language selection, font/spacing settings, and speech-speed controls are retained.

## Install dependencies
Frontend terminal:
```bash
cd Frontend
npx expo install expo-speech expo-document-picker
```
Backend terminal:
```bash
cd Backend
npm install
```

## Configure the API URL
Create `Frontend/.env` and set the base URL reachable from the phone/emulator:
```env
EXPO_PUBLIC_API_URL=http://YOUR_COMPUTER_LAN_IP:5000
```
Examples: physical phone: `http://192.168.1.10:5000` (replace with your computer's actual LAN IP); Android emulator: often `http://10.0.2.2:5000`. Do not use `localhost` from a physical phone because it points to the phone itself. Ensure both devices are on the same trusted network and your firewall permits the connection. Restart Expo after changing `.env`.

## Run
Terminal 1: `cd Backend && npm install && node server.js`
Terminal 2: `cd Frontend && npx expo start -c`

## Important limitations and checks
1. The `.doc` legacy Word format is not supported; save it as `.docx`.
2. Text-based PDFs work. Scanned/image-only PDFs return a clear message; OCR for PDF pages is not included in this change. Upload page images instead, or add PDF page rendering + OCR as a separate feature.
3. Tesseract Sinhala/Tamil OCR accuracy depends on image clarity, fonts, and trained-data availability. First OCR use may download language data and require internet access.
4. Speech language codes (`en-US`, `si-LK`, `ta-IN`) are requests to the device TTS engine, not a guarantee that a Sinhala/Tamil voice is installed. Test on the target Android/iOS devices; if a language voice is missing, install/enable a supported voice in device accessibility/text-to-speech settings or use a server-side speech service.
5. Text extraction endpoint is unauthenticated in this development implementation. Before public deployment, add authentication, request rate limits, and production file scanning. Files are held in memory only and should not be logged.
6. The uploaded project was updated by code inspection but was not built/run on a physical device in this environment.
