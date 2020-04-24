var sslRedirect = require("heroku-ssl-redirect");

var express = require("express"),
  path = require("path"),
  app = express();

var compress = require('compression');
app.use(sslRedirect());
app.use(compress());
require("dotenv").config();
// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist"));

app.use(logUrl);
function logUrl(req, res, next) {
  console.log(req.url);
  return next();
}

app.get("/zoom", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/zoom.html"));
});
app.get("/jitsi", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/jitsi.html"));
});


app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
