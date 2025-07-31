/* ================== Dependencies ================== */
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Monster = require("../models/monster.js");
/* ================== CREATE ================== */
/* ================== READ ================== */
router.get("/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const createdMonsters = await Monster.find({
      creator: currentUser,
    });
    const favoritedMonsters = await Monster.find({});
    res.render("users/show.ejs", { currentUser, createdMonsters });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});
/* ================== UPDATE ================== */
/* ================== DELETE ================== */
/* ================== EXPORT ================== */
module.exports = router;
