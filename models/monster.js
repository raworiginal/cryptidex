/* ===================== Dependencies ===================== */
const mongoose = require("mongoose");
const Glossary = require("./data.js");
/* ===================== Constants ===================== */
const typeNames = Glossary.monsterTypes.map((type) => type.name);
const rangeTags = Glossary.rangeTags.map((tag) => tag.tagName);
/* ===================== Models ===================== */

const attackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  harm: { type: Number, min: 0, required: true },
  rangeTag: {
    type: String,
    enum: rangeTags,
    required: true,
  },
  otherTags: { type: [String] },
});

const powerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const typeSchema = new mongoose.Schema({
  name: { type: String, enum: typeNames, required: true },
  motivation: { type: String, required: true },
});

const monsterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: typeSchema, required: true },
  description: { type: String },
  weaknesses: { type: [String] },
  armor: { type: Number, min: 0 },
  harmCapacity: { type: Number, required: true },
  attacks: [attackSchema],
  powers: [powerSchema],
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
