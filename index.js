var express = require("express");
var app = express();
var bodyParser = require('body-parser');

app.set("port", 8000);

app.listen(app.get("port"), function () {
  console.log("app is running on port " + app.get("port"));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

  if (pwd.length >= 8) {
    res.send("has 8 characters");
  } else {
    res.send("less than 8 characters");
  }

  var pwd = req.query.password;//Nextstacks12
  var capital = false;
  var i = 0;
  while (i < pwd.length) {
    var letter = pwd.substring(i, i + 1);
    if (letter == letter.toUpperCase()) {
      console.log("letter is capital");
    } else {
      console.log("letter is not capital");
    }
    i++;
  }
});


app.post("/checkeven", function (req, res) {
  if (req.body.num % 2 == 0) {
    res.json({ status: true, message: "number is even" });
  } else {
    res.json({ status: true, message: "number is odd" });
  }
})

