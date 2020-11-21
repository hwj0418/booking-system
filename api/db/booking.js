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

let booking_db = {};

booking_db.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM membership", (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

booking_db.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM membership WHERE id =? ",
      phone,
      (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      }
    );
  });
};
