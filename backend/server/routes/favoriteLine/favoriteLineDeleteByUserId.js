const express = require("express");
const router = express.Router();
const favoriteTrainLineModel = require("../../models/favoriteTrainLineModel");
const userModel = require("../../models/userModel");
const trainLineModel = require("../../models/trainLineModel");

router.delete("/", async (req, res) => {
    const { userId, trainLine } = req.body;

    const user = await userModel.findById(userId);
    const trainStation = await trainLineModel.findOne({ trainLine: trainLine});
    if (!user) return res.status(404).send({ message: "UserId not found." });
    if (!trainStation) return res.status(404).send({ message: "TrainLine not found." });

    try {
        const deleteFavorite = await favoriteTrainLineModel.findOneAndDelete({username: user.username,trainLine: trainLine});
        if (!deleteFavorite) {
            return res.status(200).send({ message: "Not currently a Favorite." });
        }
        res.send({ message: "TrainLine deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error deleting TrainLine." });
    }
});

module.exports = router;
