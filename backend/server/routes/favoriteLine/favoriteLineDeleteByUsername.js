const express = require("express");
const router = express.Router();
const favoriteTrainLineModel = require("../../models/favoriteTrainLineModel");
const userModel = require("../../models/userModel");

router.delete("/deleteByUsername", async (req, res) => {
    const { username, trainLine } = req.body;

    const user = await userModel.findOne({ username: username});
    const trainStation = await userModel.findOne({ trainLine: trainLine});
    if (!user) return res.status(404).send({ message: "Username not found." });
    if (!trainStation) return res.status(404).send({ message: "TrainLine not found." });

    try {
        const deleteFriend = await favoriteTrainLineModel.findOneAndDelete({username: username,trainLine: trainLine});
        if (!deleteFriend) {
            return res.status(404).send({ message: "Not currently a Favorite." });
        }
        res.send({ message: "TrainLine deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error deleting TrainLine." });
    }
});

module.exports = router;
