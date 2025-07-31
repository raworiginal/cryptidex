const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoritedMonsters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Monster",
    },
  ],
  createdMonsters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Monster",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
