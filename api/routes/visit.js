"use strict";
var express = require("express");
const visits = require("../db/visit.db");
var router = express.Router();
var datetime = new Date();

const Visit = function (phone, firstname, lastname,gender, therapist, note) {
  this.phone = phone;
  this.firstname = firstname;
  this.lastname = lastname;
  this.gender = gender;
  this.therapist = therapist;
  this.note = note;
};

router.get("/", async (req, res, next) => {
  try {
    let result = await visits.all();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/:phone", async (req, res, next) => {
  try {
    let result = await visits.one(req.params.phone);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/new", async (req, res, next) => {
  console.log("Creating new visit", req.body);
  try {
    let matching_visit = await visits.one(req.body.phone, datetime.getDate());
    if (!matching_visit) {
      let new_visit = new Visit(
        req.body.phone,
        req.body.firstname,
        req.body.lastname,
        req.body.gender,
        req.body.therapist,
        req.body.note
      );
			console.log("sending new staff:", new_visit);
      let result = await visits.new(new_visit);
      res.send(result);
    } else {
      console.error(
        "already has a visit ",
        req.body.phone
      );
      res.sendStatus(304);
      res.send(matching_visit);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put("/update", async (req, res, next) => {
  try {
    let matching_visit = await visits.one(req.body.id);
    if (matching_visit) {
			matching_visit.phone = req.body.phone;
      matching_visit.firstname = req.body.firstname;
      matching_visit.lastname = req.body.lastname;
      matching_visit.gender = req.body.gender;
      matching_visit.therapist = req.body.therapist;
      matching_visit.note = req.body.note;
			console.log("sending new staff:", matching_visit);
      let result = await staffs.update_staff(matching_visit);
      res.send(result);
    } else {
      console.error(
        "can't update non exist staff:",
        req.body.phone
      );
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
		let result = await staffs.delete(req.params.id);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});


module.exports = router;