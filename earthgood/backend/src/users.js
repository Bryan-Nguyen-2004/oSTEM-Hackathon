const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// updates user info (body = any item needed to be updated)
router.put("/:id", async (req, res) => {
    if (req.body.password) // updates password
    {
        const salt = await bcrypt.genSalt(5);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, // used to find user
            { $set: req.body }, // updates every item in body given
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// deletes user (body = nothing)
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("user deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(404).json("user not found");
    }
});

// gets user (body = nothing)
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id); //uses id in url to search for user
        const { password, ...others } = user._doc; // returns json doc of user
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
