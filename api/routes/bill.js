"use strict";
var express = require("express");
const bills = require("../db/bill.db");
var router = express.Router();

const Bill = function (service_id, therapist_id, service_fee, pay_method) {
  this.service_id = service_id;
  this.therapist_id = therapist_id;
  this.service_fee = service_fee;
  this.pay_method = pay_method;
};


module.exports = router;