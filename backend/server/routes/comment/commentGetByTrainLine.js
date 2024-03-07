const express = require("express");
const router = express.Router();
const trainLineModel = require("../../models/trainLineModel");
const commentModel = require("../../models/commentModel");

router.get("/getByTrainLine/:trainLine", async (req, res) => {
    const trainLine = await trainLineModel.findOne({
        trainLine: req.params.trainLine,
    });

    if (!trainLine)
        return res.status(404).send({ message: "trainLine not found." });

    const comments = await commentModel.find({
        trainLine: trainLine.trainLine,
    });
    return res.json(comments);
});

module.exports = router;
