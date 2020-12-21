var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoClient = require("mongodb").MongoClient;
const { json } = require("body-parser");
var cors = require('cors');

app.set("port", 8000);
app.use(cors());

app.listen(app.get("port"), function () {
  console.log("app is running on port " + app.get("port"));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoClient.connect("mongodb://localhost:27017/learn", function (err, database) {

  //API TO ADD A NEW USER
  app.post("/adduser", function (req, res) {
    var newuser = {
      name: req.body.name,
      email: req.body.email
    }

    database.db().collection("user").insertOne(newuser, function (err, doc) {
      if (err) {
        res.json({ status: false, message: "error occured" });
      } else {
        res.json({ status: true, result: doc.insertedId });
      }
    })
  });

  //API TO GET USERS
  app.post("/get_users", function (req, res) {
    var users = [];
    var cursor = database.db().collection("user").find()
    .skip(parseInt(req.body.skip)).limit(parseInt(req.body.limit));

    cursor.forEach(function (doc, err) {
      if (err) {
        res.json({ status: false, message: "error" });
      } else {
        users.push(doc);
      }
    }, function () {
      res.json({ status: true, result: users });
    });

    // res.json({ status: true, result: users });
  });


  app.post("/get_single_user", function (req, res) {
    database.db().collection("user").findOne({}, function (err, doc) {
      if (err) {
        res.json({ status: false, message: "error" });
      } else {
        res.json({ status: true, result: doc });
      }
    })
  })

});


app.post("/largestnum", function (req, res) {
  var num1 = req.body.num1;
  var num2 = req.body.num2;
  var num3 = req.body.num3;

  if (num1 > num2 && num1 > num3) {
    res.json({ status: true, message: "num 1 is greater" });
  } else if (num2 > num1 && num2 > num3) {
    res.json({ status: true, message: "num 2 is greater" });
  } else {
    res.json({ status: true, message: "num 3 is greater" });
  }
})