const express = require("express");
const router = express.Router();
const friendModel = require("../../models/friendModel");
const userModel = require("../../models/userModel");

router.delete("/deleteByUsername", async (req, res) => {
    const { username, friendUsername } = req.body;

    const user = await userModel.findOne({ username: username});
    const friendUser = await userModel.findOne({ username: friendUsername});
    if (!user) return res.status(404).send({ message: "Username not found." });
    if (!friendUser) return res.status(404).send({ message: "FriendUsername not found." });

    try {
        const deleteFriend = await friendModel.findOneAndDelete({username: username,friendUsername: friendUsername});
        if (!deleteFriend) {
            return res.status(404).send({ message: "Not currently Friends." });
        }
        res.send({ message: "Friendship deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error deleting Friendship." });
    }
});

module.exports = router;
