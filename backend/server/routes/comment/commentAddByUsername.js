const express = require("express");
const router = express.Router();
const userModel = require("../../models/userModel");
const commentModel = require("../../models/commentModel");

router.post("/addByUsername", async (req, res) => {
    console.log(req.body);
    const { username, trainLine, comment } = req.body;

    //check if username does not found
    // const user = await userModel.findOne({ username: username });
    // if (!user) return res.status(404).send({ message: "Username not found." });

    //creates a new comment
    const createComment = new commentModel({
        username: username,
        trainLine: trainLine,
        comment: comment,
    });

    try {
        const saveNewComment = await createComment.save();
        res.send(saveNewComment);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error trying to create new comment" });
    }
});

module.exports = router;
