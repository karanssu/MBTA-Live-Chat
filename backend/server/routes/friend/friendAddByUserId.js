const express = require("express");
const router = express.Router();
const userModel = require("../../models/userModel");
const friendModel = require("../../models/friendModel");

router.post("/addByUserId", async (req, res) => {
    const { userId, friendUserId} = req.body;

    const user = await userModel.findById(userId);
    const friendUser = await userModel.findById(friendUserId);
    if (!user) return res.status(404).send({ message: "UserId not found." });
    if (!friendUser) return res.status(404).send({ message: "FriendUserId not found." });

    // Check if already Friends
    const areFriends = await friendModel.findOne({ username: user.username, friendUsername: friendUser.username });
    if (areFriends) return res.status(409).send({ message: "Users are already Besties." });
    
    const addFriend = new friendModel({
        username: user.username,
        friendUsername: friendUser.username,
    });

    try {
        const saveFriend = await addFriend.save();
        res.send(saveFriend);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error trying to add Friend." });
    }
});

module.exports = router;