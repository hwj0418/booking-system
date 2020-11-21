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

let membership_db = {};

membership_db.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM membership", (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

membership_db.one = (phone) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM membership WHERE phone =? ",
      phone,
      (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      }
    );
  });
};

membership_db.new_member = (member) => {
  console.log("db recieve new member", member);
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO membership SET ?", member, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

membership_db.delete = (phone) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM membership WHERE phone=?",
      phone,
      (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      }
    );
  });
};

membership_db.update_member = (member, phone) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE membership SET ? WHERE phone=?",
      [member, phone],
      (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      }
    );
  });
};

membership_db.deposit_store_credit = (phone, fund) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE membership SET store_credit = store_credit + ? WHERE phone = ?",
      [fund, phone],
      (err, results) => {
        if (err) return reject(err);

        return resolve(results[0]);
      }
    );
  });
};

membership_db.use_store_credit = (phone, fund) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE membership SET store_credit = store_credit - ? WHERE phone = ?",
      [fund, phone],
      (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      }
    );
  });
};

membership_db.deposit_insurance_credit = (phone, fund) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE membership SET insurance_credit = insurance_credit + ? WHERE phone = ?",
      [fund,phone],
      (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      }
    );
  });
};

membership_db.use_insurance_credit = (phone, fund) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE membership SET insurance_credit = insurance_credit - ? WHERE phone = ?",
      [fund,phone],
      (err, results) => {
        if (err) return reject(err);

        return resolve(results[0]);
      }
    );
  });
};

module.exports = membership_db;
