var express = require("express"),
  path = require("path"),
  passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy,
  session = require("express-session"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist"));

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the FacebookStrategy within Passport.
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: process.env.FB_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        //Check whether the User exists or not using profile.id
        //Further DB code.
        return done(null, profile);
      });
    }
  )
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({ secret: process.env.SESSION_SECRET, key: process.env.SESSION_KEY })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/public"));
app.use(logUrl);

function logUrl(req, res, next) {
  console.log(req.url);
  return next();
}

//Router code
app.get("/account", ensureAuthenticated, function(req, res) {
  res.json({ user: req.user });
});

//Passport Router

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/me",
    failureRedirect: "/signin"
  }),
  function(req, res) {
    res.redirect("/");
  }
);

app.get("/signout", function(req, res) {
  req.logout();
  res.redirect("/signin");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
}

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
