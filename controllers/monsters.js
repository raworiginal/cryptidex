/* ================== Dependencies ================== */
const express = require("express");
const router = express.Router();

const Monster = require("../models/monster.js");

/* ===================== CREATE ROUTES ===================== */
router.get("/new", (req, res) => {
  try {
    res.render("monsters/new.ejs");
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});
router.post("/", async (req, res) => {
  try {
    req.body.creator = req.session.user._id;
    await Monster.create(req.body);
    console.log(req.body);
    res.redirect("/monsters");
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});
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
