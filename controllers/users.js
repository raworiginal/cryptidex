/* ================== Dependencies ================== */
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
/* ================== CREATE ================== */
/* ================== READ ================== */
router.get("/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId)
      .populate("favoritedMonsters")
      .populate("createdMonsters");
    res.render("users/show.ejs", {
      currentUser,
      favoritedMonsters: currentUser.favoritedMonsters,
      createdMonsters: currentUser.createdMonsters,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});
/* ================== UPDATE ================== */
/* ================== DELETE ================== */
/* ================== EXPORT ================== */
module.exports = router;
