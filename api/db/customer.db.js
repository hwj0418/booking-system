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

let customer_db = {};

customer_db.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM customer", (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

customer_db.one = (phone) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM customer WHERE phone =? ",
      phone,
      (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      }
    );
  });
};

module.exports = customer_db;
