const mongoose = require("mongoose");

const readingSettingsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        fontSize: {
            type: Number,
            default: 18
        },

        fontFamily: {
            type: String,
            default: "Arial"
        },

        lineSpacing: {
            type: Number,
            default: 1.5
        },

        letterSpacing: {
            type: Number,
            default: 0
        },

        backgroundColor: {
            type: String,
            default: "#FFFFFF"
        },

        textColor: {
            type: String,
            default: "#000000"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("ReadingSettings", readingSettingsSchema);