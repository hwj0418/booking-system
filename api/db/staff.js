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

let staff_db = {};

staff_db.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM staff", (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

staff_db.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM staff WHERE id =? ", phone, (err, results) => {
      if (err) return reject(err);
      return resolve(results[0]);
    });
  });
};

staff_db.new_staff = (staff) => {
  console.log("db recieve new staff", staff);
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO staff SET ?", staff, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

staff_db.delete = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM staff WHERE id=?", id, (err, results) => {
      if (err) return reject(err);
      return resolve(results[0]);
    });
  });
};

staff_db.update_staff = (staff, id) => {
  return new Promise((resolve, reject) => {
    pool.query("UPDATE staff SET ? WHERE id=?", [staff, id], (err, results) => {
      if (err) return reject(err);
      return resolve(results[0]);
    });
  });
};

module.exports = staffs_db;
