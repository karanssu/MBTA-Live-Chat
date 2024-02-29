const express = require("express");
const router = express.Router();
const userModel = require("../../models/userModel");
const friendModel = require("../../models/friendModel");

router.post("/addByUsername", async (req, res) => {
    const { username, friendUsername } = req.body;

    const user = await userModel.findOne({ username: username});
    const friendUser = await userModel.findOne({ username: friendUsername});
    if (!user) return res.status(404).send({ message: "Username not found." });
    if (!friendUser) return res.status(404).send({ message: "FriendUsername not found." });
    
    // Check if already Friends
    const areFriends = await friendModel.findOne({ username: username, friendUsername: friendUsername });
    if (areFriends) return res.status(409).send({ message: "Users are already Besties." });

    const addFriend = new friendModel({
        username: username,
        friendUsername: friendUsername,
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