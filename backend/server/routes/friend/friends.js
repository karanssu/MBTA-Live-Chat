const express = require("express");
const router = express.Router();
const friendModel = require("../../models/friendModel");

router.get("/", async (req, res) => {
    const friends = await friendModel.find();
    return res.json(friends);
});

module.exports = router;
