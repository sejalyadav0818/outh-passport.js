const { render } = require("ejs");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
var express = require("express");
const db = require("./models");
const Cookiesession = require("cookie-session");
const keys = require("./config/keys");
const passport = require("passport");
const app = express();
db.sequelize.sync({ force: false }).then(() => {
  console.log("re sync");
});

//var body = require("body-parser");
app.set("view engine", "ejs");
app.use(
  Cookiesession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKay],
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
// app.use("/profile", profileRoutes);
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});
app.get("/profile", (req, res) => {
  res.render("profile", { user: req.user });
});

//listen port code
app.listen(2000, () => {
  console.log("server is listening!!!");
});
//refrancehttps://www.youtube.com/playlist?list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x
//finally done
