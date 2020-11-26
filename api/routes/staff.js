"use strict";
var express = require("express");
const staffs = require("../db/staff.db");
var router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let result = await staffs.all();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/:phone", async (req, res, next) => {
  try {
		let result = await staffs.one(req.params.phone);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});



router.get("/therapist", async (req, res, next) => {
  try {
    let result = await staffs.all_therapist();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/reception", async (req, res, next) => {
  try {
    let result = await staffs.all_reception();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/manager", async (req, res, next) => {
  try {
    let result = await staffs.all_manager();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/new", async (req, res, next) => {
  console.log("Creating new staff", req.body);
  try {
    let matching_staff = await staffs.one(req.body.phone);
    if (!matching_staff) {
			let new_staff = new Staff(
				req.body.firstname,
				req.body.lastname,
				req.body.gender,
				req.body.title,
				req.body.phone
			);
			console.log("sending new staff:", new_staff);
      let result = await staffs.new_staff(new_staff);
      res.send(result);
    } else {
      console.error(
        "can't create duplicate staff for this number:",
        req.body.phone
      );
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put("/update", async (req, res, next) => {
  try {
    let matching_staff = await staffs.one(req.body.phone);
    if (matching_staff) {
			let updated_staff = new Staff(
				req.body.new_firstname,
				req.body.lastname,
				req.body.gender,
				req.body.title,
				req.body.new_phone || req.body.phone,
			);
			console.log("sending new staff:", new_staff);
      let result = await staffs.update_staff(updated_staff, req.body.phone);
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

router.delete("/:phone", async (req, res, next) => {
  try {
		let result = await staffs.delete(req.params.phone);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;