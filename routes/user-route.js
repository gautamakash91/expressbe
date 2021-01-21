module.exports = {
  configure: function (app, database) {
    var user_module = require("../modules/user-module")(database);


    //API TO ADD A NEW USER
    app.post("/adduser", function (req, res) {
      var newuser = {
        name: req.body.name,
        email: req.body.email
      }
      user_module.add_user(newuser, function (error, user_id) {
        if (error == true) {
          res.json({ status: false, message: "error occured" });
        } else {
          res.json({ status: true, result: user_id });
        }
      });
    });


    //API TO GET USERS
    app.post("/get_users", function (req, res) {
      if (
        req.body.hasOwnProperty("skip") &&
        req.body.hasOwnProperty("limit")
      ) {
        user_module.get_users(req.body.skip, req.body.limit, function (error, users) {
          if (error == true) {
            res.json({ status: false, message: "error occured" });
          } else {
            res.json({ status: true, result: users });
          }
        })
      } else {
        res.json({ status: false, message: "params missing" });
      }

    });
  }
}