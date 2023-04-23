const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        answers: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);