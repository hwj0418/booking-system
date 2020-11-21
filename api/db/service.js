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

let service_db = {};

service_db.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM service", (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

service_db.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM service WHERE id=?", id, (err, results) => {
      if (err) return reject(err);
      return resolve(results[0]);
    });
  });
};

service_db.find = (name, time_length=45) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM service WHERE name=? AND time_length=?", [name, time_length], (err, results) => {
      if (err) return reject(err);
      return resolve(results[0]);
    });
  });
};

service_db.new_service = (service) => {
  console.log("db recieve new service", service);
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO service SET ?", service, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

service_db.delete = (id, name, time_length) => {
  return new Promise((resolve, reject) => {
    if (id) {
      pool.query("DELETE FROM service WHERE id=?", id, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    } else {
      pool.query(
        "DELETE FROM service WHERE name=? AND time_length=?",
        [name, time_length],
        (err, results) => {
          if (err) return reject(err);
          return resolve([name, time_length]);
        }
      );
    }
  });
};

service_db.update_service = (updated_service, name, time_length) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE service SET ? WHERE name=? AND time_length=?",
      [updated_service, name, time_length],
      (err, results) => {
        if (err) return reject(err);
        return resolve(updated_service);
      }
    );
  });
};

module.exports = service_db;
