const express = require("express");
const router = express.Router();
const userModel = require("../../models/userModel");
const commentModel = require("../../models/commentModel");

router.get("/getByUserId/:userId", async (req, res) => {
    // Error if userId does not found
    const user = await userModel.findById(req.params.userId);
    if (!user) return res.status(404).send({ message: "UserId not found." });

    const comments = await commentModel.find({ username: user.username });
    return res.json(comments);
});

module.exports = router;
