var router = require("express").Router();
const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20")
// const { google } = require("../config/keys");
// const sequelize = require("../models/index");
// const user = require("../models/user");
// const db = require("../models");
// ///auth login
router.get("/login", (req, res) => {
  res.render("login");
});

//auth logout
router.get("/logout", (req, res) => {
  res.send("log out")
});

//auth with google 
router.get("/google", passport.authenticate('google',{
    scope: ['profile']
}));    

// router.get("/google/redirect",(req,res)=>{
//     res.send("reached")
// });
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile");
});
module.exports = router;