"user strict";
var users = require("./user_db.js");

//User object constructor
var User = function (user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.gender = user.gender;
  this.store_credit = user.store_credit;
  this.insurance_credit = user.insurance_credit;
  this.created_at = new Date();
};

User.createUser = function (newUser, result) {
  users.query("INSERT INTO user set ?", newUser, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

User.getUserById = function (userId, result) {
  users.query("Select user from users where id = ? ", userId, function (
    err,
    res
  ) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.getAllUser = function (result) {
  users.query("Select * from users", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("users : ", res);

      result(null, res);
    }
  });
};

User.updateById = function (id, user, result) {
  users.query(
    "UPDATE users SET user = ? WHERE id = ?",
    [user.user, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
User.remove = function (id, result) {
  users.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Task;
