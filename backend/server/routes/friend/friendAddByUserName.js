const express = require("express");
const router = express.Router();
const z = require("zod");
const friendModel = require("../../models/friendModel");

router.post("/addByUserName", async (req, res) => {
    const {username, friendUsername } = req.body;
    friendModel.findByIdAndUpdate(
        userId,
        {
            username: username,
            friendUsername: friendUsername,
        },
    );
});
module.exports = router;