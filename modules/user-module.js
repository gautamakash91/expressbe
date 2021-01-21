module.exports = function (database) {
  var user_module = {

    add_user: function (newuser, callBack) {
      database.db().collection("user").insertOne(newuser, function (err, doc) {
        if (err) {
          callBack(true, null);
        } else {
          callBack(false, doc.insertedId);
        }
      })
    },
    get_users: function (skip, limit, callBack) {
      var users = [];
      var cursor = database.db().collection("user").find()
        .skip(parseInt(skip)).limit(parseInt(limit));

      cursor.forEach(function (doc, err) {
        if (err) {
          callBack(true, null);
        } else {
          users.push(doc);
        }
      }, function () {
        callBack(false, users);
      });
    }

  };
  return user_module;
};