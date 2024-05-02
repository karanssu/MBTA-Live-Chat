const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            label: "username",
        },
        trainLine: {
            type: String,
            required: true,
            label: "trainLine",
        },
        comment: {
            type: String,
            required: true,
            label: "comment",
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: "comments" }
);

module.exports = mongoose.model("comments", commentSchema);
