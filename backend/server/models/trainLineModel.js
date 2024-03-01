const mongoose = require("mongoose");

const trainLineSchema = new mongoose.Schema(
    {
        trainLine: {
            type: String,
            required: true,
            label: "trainLine",
        },
    },
    { collection: "trainLines" }
);

module.exports = mongoose.model("trainLines", trainLineSchema);
