const express = require("express");
const router = express.Router();
const trainLineModel = require("../../models/trainLineModel");

router.get("/", async (req, res) => {
    const trainLines = await trainLineModel.find();
    return res.json(trainLines);
});

module.exports = router;
