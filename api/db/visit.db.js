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

let visit_db = {};

visit_db.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM booking", (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

visit_db.one = (phone, date=null) => {
  return new Promise((resolve, reject) => {
    if(date){
      pool.query(
        "SELECT * FROM booking WHERE phone=? AND date=?",
        [phone, date],
        (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );
    }else{
      pool.query(
        "SELECT * FROM booking WHERE phone =? ",
        phone,
        (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );
    }
  });
};

visit_db.new_visit = (visit) => {
  console.log("db recieve new visit", visit);
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO visit SET ?", visit, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

visit_db.delete = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM visit WHERE id=?", id, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

visit_db.update_visit = (visit) => {
  return new Promise((resolve, reject) => {
    pool.query("UPDATE visit SET ? WHERE id=?", visit.id, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

module.exports = booking_db;
