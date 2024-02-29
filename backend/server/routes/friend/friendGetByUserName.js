const express = require("express");
const router = express.Router();
const friendModel = require("../../models/friendModel");
const userModel = require("../../models/userModel");

router.get("/getByUsername/:username", async (req, res) => {
    const { username } = req.params;
    const user = await userModel.findOne({ username: username});
    if (!user) {return res.status(404).send({ message: "Username not found." });}

    try {
        const friends = await friendModel.find({ username: user.username });
        if (friends.length === 0) {
            return res.status(200).send({ message: "User has no Friends." });
        } else {
            return res.json(friends);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error Getting Friends." });
    }
});

module.exports = router;
