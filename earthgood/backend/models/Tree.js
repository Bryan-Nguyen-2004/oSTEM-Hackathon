const mongoose = require("mongoose");

const TreeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        rarity: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Tree", TreeSchema);