/* ================== Dependencies ================== */
const express = require("express");
const router = express.Router();
const Monster = require("../models/monster.js");
const Glossary = require("../models/data.js");
const User = require("../models/user.js");

/* ===================== CREATE ROUTES ===================== */
//Get the new monster form
router.get("/new", (req, res) => {
  try {
    res.render("monsters/new.ejs", {
      types: Glossary.monsterTypes,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

//Create new monster and add ref to User
router.post("/", async (req, res) => {
  try {
    req.body.creator = req.session.user._id;
    req.body.type = Glossary.monsterTypes[req.body.type];
    req.body.weaknesses = req.body.weaknesses.toLowerCase().split(", ");
    const currentMonster = await Monster.create(req.body);
    await User.findByIdAndUpdate(req.session.user._id, {
      $push: { createdMonsters: currentMonster },
    });
    res.redirect(`/monsters/${currentMonster._id}`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

//Add attacks to a monster.
router.put("/:monsterId/attacks", async (req, res) => {
  try {
    req.body.otherTags = req.body.otherTags.split(",").map((tag) => tag.trim());
    await Monster.findByIdAndUpdate(req.params.monsterId, {
      $push: { attacks: req.body },
    });
    res.redirect(`/monsters/${req.params.monsterId}`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

//Add powers to a monster
router.put("/:monsterId/powers", async (req, res) => {
  try {
    await Monster.findByIdAndUpdate(req.params.monsterId, {
      $push: { powers: req.body },
    });
    res.redirect(`/monsters/${req.params.monsterId}`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

//Add user to favorited-by and add monster ref to user
router.post("/:monsterId/favorited-by/:userId", async (req, res) => {
  try {
    // Add user ref to monster
    await Monster.findByIdAndUpdate(req.params.monsterId, {
      $push: { favoritedByUsers: req.params.userId },
    });
    // Add monster ref to user
    await User.findByIdAndUpdate(req.params.userId, {
      $push: { favoritedMonsters: req.params.monsterId },
    });
    res.redirect(`/monsters/${req.params.monsterId}`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});
/* ===================== READ ROUTES ===================== */
// Get all monsters index page
router.get("/", async (req, res) => {
  try {
    const populatedMonsters = await Monster.find({}).populate("creator");
    const currentUser = await User.findById(req.session.user._id);
    res.render("monsters/index.ejs", {
      monsters: populatedMonsters,
      user: currentUser,
      Glossary,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

// Get show page for specific monster
router.get("/:monsterId", async (req, res) => {
  try {
    const populatedMonster = await Monster.findById(
      req.params.monsterId
    ).populate("creator");

    const userHasFavorited = populatedMonster.favoritedByUsers.some((user) => {
      return user.equals(req.session.user._id);
    });
    res.render("monsters/show.ejs", {
      monster: populatedMonster,
      userHasFavorited: userHasFavorited,
      rangeTags: Glossary.rangeTags,
      otherTags: Glossary.otherTags,
      Glossary,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});
/* ===================== UPDATE ===================== */

//Get form to edit a monster
router.get("/:monsterId/edit", async (req, res) => {
  try {
    const currentMonster = await Monster.findById(req.params.monsterId);
    res.render("monsters/edit.ejs", {
      monster: currentMonster,
      types: Glossary.monsterTypes,
      Glossary,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

//Update monster
router.put("/:monsterId/", async (req, res) => {
  try {
    const currentMonster = await Monster.findById(req.params.monsterId);
    if (currentMonster.creator.equals(req.session.user._id)) {
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

// Update an attack
router.put("/:monsterId/attacks/:attackId", async (req, res) => {
  try {
    const currentMonster = await Monster.findById(req.params.monsterId);
    const attack = currentMonster.attacks.id(req.params.attackId);
    req.body.otherTags.split(",").map((tag) => tag.trim());
    attack.set(req.body);
    await currentMonster.save();
    res.redirect(`/monsters/${currentMonster._id}`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

// Update a power
router.put("/:monsterId/powers/:powerId", async (req, res) => {
  try {
    const currentMonster = await Monster.findById(req.params.monsterId);
    const power = currentMonster.powers.id(req.params.powerId);
    power.set(req.body);
    await currentMonster.save();
    res.redirect(`/monsters/${currentMonster._id}`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});
/* ===================== DELETE ===================== */
//Delete a monster
router.delete("/:monsterId", async (req, res) => {
  try {
    await User.updateMany(
      { favoritedMonsters: req.params.monsterId },
      { $pull: { favoritedMonsters: req.params.monsterId } }
    );

    // Remove from createdMonsters
    await User.updateMany(
      { createdMonsters: req.params.monsterId },
      { $pull: { createdMonsters: req.params.monsterId } }
    );
    await Monster.findByIdAndDelete(req.params.monsterId);
    res.redirect(`/users/${req.session.user._id}`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

//Delete an attack from a monster
router.delete("/:monsterId/attacks/:attackId", async (req, res) => {
  try {
    const currentMonster = await Monster.findById(req.params.monsterId);
    currentMonster.attacks.pull(req.params.attackId);
    await currentMonster.save();
    res.redirect(`/monsters/${currentMonster._id}`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

//DELETE a power from a monster
router.delete("/:monsterId/powers/:powerId", async (req, res) => {
  try {
    const currentMonster = await Monster.findById(req.params.monsterId);
    currentMonster.powers.pull(req.params.powerId);
    await currentMonster.save();
    res.redirect(`/monsters/${currentMonster._id}`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

//Unfavorite a monster
router.delete("/:monsterId/favorited-by/:userId", async (req, res) => {
  try {
    await Monster.findByIdAndUpdate(req.params.monsterId, {
      $pull: { favoritedByUsers: req.params.userId },
    });
    await User.findByIdAndUpdate(req.params.userId, {
      $pull: { favoritedMonsters: req.params.monsterId },
    });
    res.redirect(`/monsters/${req.params.monsterId}`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

/* ================== Exports ================== */
module.exports = router;
