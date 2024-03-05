const express = require("express");
const router = express.Router();
const favoriteTrainLineModel = require("../../models/favoriteTrainLineModel");
const userModel = require("../../models/userModel");

router.get("/getByUsername/:username", async (req, res) => {
    const { username } = req.params;
    const user = await userModel.findOne({ username: username});
    if (!user) {return res.status(404).send({ message: "Username not found." });}

    try {
        const trainLines = await favoriteTrainLineModel.find({ username: user.username });
        if (trainLines.length === 0) {
            return res.status(200).send({ message: "User has no Favorite Lines." });
        } else {
            return res.json(trainLiness);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error Getting Favorite Lines." });
    }
});

module.exports = router;