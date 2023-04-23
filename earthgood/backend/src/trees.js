const router = require("express").Router();
const Tree = require("../models/Tree");

// gets all trees (body = nothing)
router.get("/", async (req, res) => {
    try {
        let trees = await Tree.find();
        res.status(200).json(trees);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;