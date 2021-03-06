var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
const { json } = require("body-parser");
var cors = require('cors');
var userroute = require("./routes/user-route");

app.set("port", 8000);
app.use(cors());

app.listen(app.get("port"), function () {
  console.log("app is running on port " + app.get("port"));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoClient.connect("mongodb://localhost:27017/learn", function (err, database) {

  userroute.configure(app, database);






  app.post("/get_single_user", function (req, res) {
    database.db().collection("user").findOne({ _id: new ObjectID(req.body.id) }, function (err, doc) {
      if (err) {
        res.json({ status: false, message: "error" });
      } else {
        res.json({ status: true, result: doc });
      }
    })
  });

  app.post("/get_user_details", function (req, res) {
    var data = [];
    var cursor = database.db().collection("user").aggregate([
      {
        $match: { _id: new ObjectID(req.body.id) }
      }, {
        $lookup: {
          from: "scorecategory",
          localField: "score",
          foreignField: "max",
          as: "score_details"
        },
      },
      {
        $unwind: "$score_details"
      }
    ])

    cursor.forEach(function (doc, err) {
      if (err) {
        res.json({ status: false, message: "error" });
      } else {
        // res.json({ status: true, result: doc });
        data.push(doc);
      }
    },function(){
      if(data.length > 0 ){
        res.json({status: true, result: data});
      }else{
        res.json({ status: false, message: "no data" });
      }
    });
  })

  app.post("/delete_user", function (req, res) {
    if (
      req.body.hasOwnProperty("id") &&
      req.body.hasOwnProperty("name")
    ) {
      database.db().collection("user").deleteOne({ _id: new ObjectID(req.body.id) }, function (err, obj) {
        if (err) {
          res.json({ status: false, message: "error occured" });
        } else {
          res.json({ status: true, message: "user deleted" });
        }
      })
    } else {
      if (req.body.hasOwnProperty("id") == null) {
        res.json({ status: false, message: "id parameter is missing" });
      } else if (!req.body.hasOwnProperty("name")) {
        res.json({ status: false, message: "name parameter is missing" });
      }
    }
  });

  app.post("/update_user", function (req, res) {
    database.db().collection("user").updateOne({ _id: new ObjectID(req.body.id) }, {
      $set: {
        name: req.body.name,
        email: req.body.email
      },
      $inc: {
        age: 1
      },
      $push: {
        skills: req.body.course
      }
    }, { upsert: false }, function (err, result) {
      if (err) {
        res.json({ status: false, message: "error occured" });
      } else {
        res.json({ status: true, message: "user updated" });
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