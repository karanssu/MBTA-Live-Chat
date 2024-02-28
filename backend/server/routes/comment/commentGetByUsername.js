const express = require("express");
const router = express.Router();
const userModel = require("../../models/userModel");
const commentModel = require("../../models/commentModel");

router.get("/getByUsername/:username", async (req, res) => {
    // Error if username does not found
    const user = await userModel.findOne({ username: req.params.username });
    if (!user) return res.status(404).send({ message: "Username not found." });

    const comments = await commentModel.find({ username: user.username });
    return res.json(comments);
});

module.exports = router;
