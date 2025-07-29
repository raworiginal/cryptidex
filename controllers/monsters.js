/* ================== Dependencies ================== */
const express = require("express");
const router = express.Router();

const Monster = require("../models/monster.js");

/* ===================== CREATE ROUTES ===================== */
/* ===================== READ ROUTES ===================== */
router.get("/", async (req, res) => {
  try {
    const populatedMonsters = await Monster.find({}).populate("creator");
    console.log(populatedMonsters);
    res.render("monsters/index.ejs");
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});
/* ===================== UPDATE ===================== */
/* ===================== DELETE ===================== */

/* ================== Exports ================== */
module.exports = router;

/* ==================  ================== */
