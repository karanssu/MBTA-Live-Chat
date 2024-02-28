const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            label: "username",
        },
        friendUsername: {
            type: String,
            required: true,
            label: "friendUsername",
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: "friends" }
);

module.exports = mongoose.model("friends", friendSchema);
