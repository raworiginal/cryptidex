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
//Add attacks to monster.
router.put("/:monsterId/attacks", async (req, res) => {
  try {
    await Monster.findByIdAndUpdate(req.params.monsterId, {
      $push: { attacks: req.body },
    });
    res.redirect(`/monsters/${req.params.monsterId}`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});
/* ===================== READ ROUTES ===================== */
router.get("/", async (req, res) => {
  try {
    const populatedMonsters = await Monster.find({}).populate("creator");
    res.render("monsters/index.ejs", {
      monsters: populatedMonsters,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});
router.get("/:monsterId", async (req, res) => {
  try {
    const populatedMonster = await Monster.findById(
      req.params.monsterId
    ).populate("creator");
    // res.send(`This will be the page for ${populatedMonster.name}`);
    res.render("monsters/show.ejs", {
      monster: populatedMonster,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});
/* ===================== UPDATE ===================== */

//Edit Monster
router.get("/:monsterId/edit", async (req, res) => {
  try {
    const currentMonster = await Monster.findById(req.params.monsterId);
    res.render("monsters/edit.ejs", {
      monster: currentMonster,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

router.put("/:monsterId/", async (req, res) => {
  try {
    const currentMonster = await Monster.findById(req.params.monsterId);
    if (currentMonster.creator.equals(req.session.user._id)) {
      console.log(req.body);
      await currentMonster.updateOne(req.body);
      res.redirect(`/monsters/${req.params.monsterId}`);
    } else {
      res.send("You do not have edit permission for this monster.");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});
/* ===================== DELETE ===================== */

/* ================== Exports ================== */
module.exports = router;

/* ==================  ================== */
