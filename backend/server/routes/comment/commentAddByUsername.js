const express = require("express");
const router = express.Router();
const userModel = require("../../models/userModel");
const trainLineModel = require("../../models/trainLineModel");
const commentModel = require("../../models/commentModel");

router.post("/addByUsername", async (req, res) => {
    const { username, trainLine, comment } = req.body;

    // Error if username does not found
    const user = await userModel.findOne({ username: username });
    if (!user) return res.status(404).send({ message: "Username not found." });

    // Error if trainLine does not found
    const trainLineInstance = await trainLineModel.findOne({
        trainLine: trainLine,
    });
    if (!trainLineInstance)
        return res.status(404).send({ message: "TrainLine not found." });

    const createComment = new commentModel({
        username: username,
        trainLine: trainLine,
        comment: comment,
    });

    try {
        const saveComment = await createComment.save();
        res.send(saveComment);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error trying to create new comment" });
    }
});

module.exports = router;
