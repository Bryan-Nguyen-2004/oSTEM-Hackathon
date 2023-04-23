const router = require("express").Router();
const Question = require("../models/Question");

// gets all questions (body = nothing)
router.get("/", async (req, res) => {
    try {
        let questions = await Question.find();
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;