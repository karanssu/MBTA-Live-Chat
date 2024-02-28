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
    
    const addFriend = new friendModel({
        username: username,
        friendUsername: friendUsername,
    });

    try {
        const saveFriend = await addFriend.save();
        res.send(saveFriend);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error trying to add friend" });
    }
});

module.exports = router;