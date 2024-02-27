const mongoose = require("mongoose");

const addFriendSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    friendUserName: {
      type: String,
      required: true,
      label: "friendUserName",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "friends" }
);

module.exports = mongoose.model('friends', addFriendSchema)