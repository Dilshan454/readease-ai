
const express = require("express");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/learningMaterialUpload");

const {
    createLesson,
    getLessons,
    uploadLearningMaterial
} = require("../controllers/lessonController");

const router = express.Router();


router.post("/", protect, createLesson);


router.get("/", protect, getLessons);


router.post(
    "/upload",
    protect,
    upload.single("file"),
    uploadLearningMaterial
);

module.exports = router;
