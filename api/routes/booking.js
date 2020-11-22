"use strict";
var express = require("express");
const memberships = require("../db/booking.db");
var router = express.Router();

const Booking = function (phone, firstname, lastname, service_id) {
  this.phone = phone;
  this.firstname = firstname;
  this.lastname = lastname;
  this.gender = gender;
};

router.get("/", async (req, res, next) => {
  try {
    let result = await memberships.all();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/:phone", async (req, res, next) => {
  try {
    let result = await memberships.one(req.params.phone);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;