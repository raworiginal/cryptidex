/* ===================== Dependencies ===================== */
const mongoose = require("mongoose");

/* ===================== Constants ===================== */
const MONSTER_TYPES = [
  { name: "Beast", motivation: "to run wild, destroying and killing" },
  {
    name: "Breeder",
    motivation: "to give birth to, bring forth, or create evil",
  },
  { name: "Collector", motivation: "to steal specific sorts of things" },
  { name: "Destroyer", motivation: "to bring about the end of the world" },
  { name: "Devourer", motivation: "to consume people" },
  { name: "Executioner", motivation: "to punish the guilty" },
  { name: "Parasite", motivation: "to infest, control and devour" },
  { name: "Queen", motivation: "to possess and control" },
  { name: "Sorcerer", motivation: "to usurp unnatural power" },
  { name: "Tempter", motivation: "to tempt people into evil deeds" },
  { name: "Torturer", motivation: "to hurt and terrify" },
  { name: "Trickster", motivation: "to create chaos" },
];
const typeNames = MONSTER_TYPES.map((type) => type.name);
/* ===================== Models ===================== */

const attackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  harm: { type: Number, min: 0, required: true },
  rangeTag: {
    type: String,
    enum: ["intimate", "hand", "close", "far"],
    required: true,
  },
  otherTags: { type: [String] },
  description: { type: String },
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
module.exports = { Monster, MONSTER_TYPES };
