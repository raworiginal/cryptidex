/* ===================== Dependencies ===================== */
const mongoose = require("mongoose");

/* ===================== Models ===================== */

const attackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  harm: { type: Number, min: 1, required: true },
  description: { type: String },
});

const monsterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: [
      "Undead",
      "Fae",
      "Beast",
      "Spirit",
      "Cybernetic",
      "Unknown",
      "Alien",
      "Human",
    ],
    required: true,
  },
  description: { type: String },
  image: { type: String },
  armor: { type: Number, min: 0 },
  attacks: [attackSchema],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  favoritedByUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Monster = mongoose.model("Monster", monsterSchema);
/* ===================== Exports ===================== */
module.exports = Monster;
