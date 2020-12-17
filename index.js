var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoClient = require("mongodb").MongoClient;

app.set("port", 8000);

app.listen(app.get("port"), function () {
  console.log("app is running on port " + app.get("port"));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoClient.connect("mongodb://localhost:27017/learn", function (err, database) {
  
  app.post("/adduser", function (req, res) {
    var newuser = {
      name: req.body.name,
      email: req.body.email
    }

    database.db().collection("user").insertOne(newuser, function (err, doc) {
      console.log(doc);
      res.json({ status: true, result: doc.insertedId });
    })
  });

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