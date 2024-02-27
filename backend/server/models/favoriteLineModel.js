const mongoose = require("mongoose");

//user schema/model
const favoriteLineSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    trainLineColor: {
      type: String,
      required: true,
      label: "trainLineColor",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "favorites" }
);

module.exports = mongoose.model('favorites', favoriteLineSchema)