
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(
    __dirname,
    "..",
    "uploads",
    "learning-materials"
);


fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});


const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        ".pdf",
        ".docx",
        ".txt"
    ];

    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(extension)) {
        cb(null, true);
    } else {
        cb(
            new Error("Only PDF, DOCX, and TXT files are allowed.")
        );
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 
    }
});

module.exports = upload;
