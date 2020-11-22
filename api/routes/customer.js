"use strict";
var express = require("express");
const customers = require("../db/customer.db");
var router = express.Router();

const Customer = function (firstname, lastname, gender, phone) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.gender = gender;
  this.phone = phone;
};


module.exports = router;