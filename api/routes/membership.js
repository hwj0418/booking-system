"use strict";
var express = require("express");
const db = require("../db/membership");
var router = express.Router();

const Membership = function (phone, firstname, lastname, gender) {
  this.phone = phone;
  this.firstname = firstname;
  this.lastname = lastname;
  this.gender = gender;
};

router.get("/", async (req, res, next) => {
  try {
    let result = await db.all();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/:phone", async (req, res, next) => {
  try {
    let result = await db.one(req.params.phone);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/new-member", async (req, res, next) => {
  console.log("Creating membership registration for:", req.body);
  let new_member = new Membership(
    req.body.phone,
    req.body.firstname,
    req.body.lastname,
    req.body.gender
  );
  console.log("sending new member:", new_member);
  try {
    let matching_member = await db.one(req.body.phone);
    if (!matching_member) {
      let result = await db.new_member(new_member);
      res.send(result);
    } else {
      console.error(
        "can't create duplicate user for this number:",
        req.body.phone
      );
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put("/update-member", async (req, res, next) => {
  try {
    let matching_member = await db.one(req.body.phone);
    if (matching_member) {
      let updated_member = new Membership(
        req.body.new_phone || req.body.phone,
        req.body.firstname,
        req.body.lastname,
        req.body.gender
      );
      console.log(
        "updating member with new member",
        req.body.phone,
        updated_member
      );
      let result = await db.update_member(updated_member, req.body.phone);
      res.send(result);
    } else {
      console.error(
        "can't update member info for non-exist member:",
        req.body.phone
      );
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put("/deposit-store-credit", async (req, res, next) => {
	try {
    let matching_member = await db.one(req.body.phone);
    if (matching_member) {
      let result = await db.deposit_store_credit(req.body.phone, req.body.store_credit);
      res.send(result);
    } else {
      console.error(
        "can't add fund to non-exist member",
        req.body.phone
      );
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put("/use-store-credit", async (req, res, next) => {
	try {
    let matching_member = await db.one(req.body.phone);
    if (matching_member) {
      let result = await db.use_store_credit(req.body.phone, req.body.store_credit);
      res.send(result);
    } else {
      console.error(
        "can't add fund to non-exist member",
        req.body.phone
      );
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put("/deposit-insurance-credit", async (req, res, next) => {
	try {
    let matching_member = await db.one(req.body.phone);
    if (matching_member) {
      let result = await db.deposit_insurance_credit(req.body.phone, req.body.insurance_credit);
      res.send(result);
    } else {
      console.error(
        "can't deposit fund for non-exist member",
        req.body.phone
      );
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put("/use-insurance-credit", async (req, res, next) => {
	try {
    let matching_member = await db.one(req.body.phone);
    if (matching_member) {
      let result = await db.use_insurance_credit(req.body.phone, req.body.insurance_credit);
      res.send(result);
    } else {
      console.error(
        "can't use fund of non-exist member",
        req.body.phone
      );
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
