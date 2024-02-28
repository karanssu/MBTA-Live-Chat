const express = require("express");
const router = express.Router();
const userModel = require("../../models/userModel");
const commentModel = require("../../models/commentModel");

router.post("/addByUserId", async (req, res) => {
    const { userId, trainLine, comment } = req.body;

    // Error if userId does not found
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).send({ message: "UserId not found." });

    // TODO: // we need trainLineModel
    // TODO:// check if trainLine does not found

    const createComment = new commentModel({
        username: user.username,
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
