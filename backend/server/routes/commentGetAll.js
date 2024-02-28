const express = require("express");
const router = express.Router();
const newCommentModel = require("../models/commentModel");

router.get("/getAll", async (req, res) => {
    const comments = await newCommentModel.find();
    return res.json(comments);
});

module.exports = router;
