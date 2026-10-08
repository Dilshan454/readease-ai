const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        question: {
            type: String,
            required: true
        },

        options: {
            type: [String],
            required: true
        },

        correctAnswer: {
            type: String,
            required: true
        },

        language: {
            type: String,
            default: "English"
        },

        difficulty: {
            type: String,
            default: "Easy"
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Exercise", exerciseSchema);