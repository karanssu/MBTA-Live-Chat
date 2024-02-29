const express = require("express");
const router = express.Router();
const friendModel = require("../../models/friendModel");
const userModel = require("../../models/userModel");

router.delete("/deleteByUserId", async (req, res) => {
    const { userId, friendUserId } = req.body;

    const user = await userModel.findById(userId);
    const friendUser = await userModel.findById(friendUserId);
    if (!user) return res.status(404).send({ message: "User ID not found." });
    if (!friendUser) return res.status(404).send({ message: "Friend User ID not found." });

    try {
        const deleteFriend = await friendModel.findOneAndDelete({username: user.username,friendUsername: friendUser.username});
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
