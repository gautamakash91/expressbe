var express = require("express");
var app = express();

app.set("port", 8000);

app.listen(app.get("port"), function () {
  console.log("app is running on port " + app.get("port"));
});

app.get("/login", function (req, res) {
  var email = req.query.email;
  var password = req.query.password;

  if (email == "eve.holt@reqres.in" && password == "cityslicka") {
    res.send("login successful");
  } else {
    res.send("login failed");
  }
});

app.get("/checkpwd", function (req, res) {
  //at least 1 capital letter
  //at least 1 small letter
  //at least 8 characters
  
});