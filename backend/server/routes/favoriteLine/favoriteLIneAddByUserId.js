const express = require("express");
const router = express.Router();
const userModel = require("../../models/userModel");
const favoriteTrainLineModel = require("../../models/favoriteTrainLineModel");

router.post("/addByUserId", async (req, res) => {
    const { userId, trainLine } = req.body;

    const user = await userModel.findById(userId);
    const trainStation = await userModel.findOne({ trainLine: trainLine});
    if (!user) return res.status(404).send({ message: "UserId not found." });
    if (!trainStation) return res.status(404).send({ message: "TrainLine not found." });

    // Check if already in Favorite
    const inFavorite = await favoriteTrainLineModel.findOne({ username: user.username, trainLine: trainLine });
    if (inFavorite) return res.status(409).send({ message: "This TrainLine is already your favorite." });

    const addTrainLine = new favoriteTrainLineModel({
        username: user.username,
        trainLine: trainLine,
    });

    try {
        const saveTrainLine = await addTrainLine.save();
        res.send(saveTrainLine);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error trying to add TrainLine." });
    }
});

module.exports = router;