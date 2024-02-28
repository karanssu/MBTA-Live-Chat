const mongoose = require("mongoose");

//user schema/model
const favoriteTrainLineSchema = new mongoose.Schema(
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
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: "favorites" }
);

module.exports = mongoose.model("favorites", favoriteTrainLineSchema);
