const mongoose = require("mongoose");

//comment schema/model
const newCommentSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            label: "username",
        },
        comment: {
            type: String,
            required: true,
            label: "comment",
        },
        trainLine: {
            type: String,
            required: true,
            label: "trainLine",
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: "comments" }
);

module.exports = mongoose.model("comments", newCommentSchema);
