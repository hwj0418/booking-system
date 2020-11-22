"use strict";
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  password: "Ddh0418.",
  user: "root",
  database: "mydb",
  host: "localhost",
  port: "3306",
});

let role_db = {};

role_db.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM role", (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

role_db.one = (title) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM role WHERE title =? ", title, (err, results) => {
      if (err) return reject(err);
      return resolve(results[0]);
    });
  });
};

role_db.new_role = (role) => {
  console.log("db recieve new role", role);
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO role SET ?", role, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

role_db.delete = (title) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM role WHERE title=?", title, (err, results) => {
      if (err) return reject(err);
      return resolve(results[0]);
    });
  });
};

role_db.update_role = (role, title) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE role SET ? WHERE title=?",
      [role, title],
      (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      }
    );
  });
};
