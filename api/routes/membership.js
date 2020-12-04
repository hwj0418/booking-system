"use strict";
const express = require("express");
const memberships = require("../db/membership.db");
const memberValidation = require("../validation");
const router = express.Router();

const Membership = function (phone, firstname, lastname, gender) {
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

router.delete("/:phone", async (req, res, next) => {
  try {
    let result = await memberships.delete(req.params.phone);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/new-member", async (req, res, next) => {
  const { error } = memberValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const matching_member = await memberships.one(req.body.phone);
  if (matching_member) return res.status(400).send("member already exist.");

  console.log("Creating membership registration for:", req.body);
  let new_member = new Membership(
    req.body.phone,
    req.body.firstname,
    req.body.lastname,
    req.body.gender
  );
  console.log("sending new member:", new_member);

  try {
    const result = await memberships.new_member(new_member);
    res.send(result.phone + "member created.");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put("/update-member", async (req, res, next) => {
  // Validate input
  const { error } = memberValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Varify user exisit
  const matching_member = await memberships.one(req.body.phone);
  if (!matching_member) return res.status(400).send("member does not exist.");

  try {
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
    let result = await memberships.update_member(
      updated_member,
      req.body.phone
    );
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put("/deposit-store-credit", async (req, res, next) => {
  // Validate input
  const { error } = memberValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Varify user exisit
  const matching_member = await memberships.one(req.body.phone);
  if (!matching_member) return res.status(400).send("member does not exist.");

  try {
    let result = await memberships.deposit_store_credit(
      req.body.phone,
      req.body.store_credit
    );
    res.send("current credit:", result.store_credit);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put("/use-store-credit", async (req, res, next) => {
  // Validate input
  const { error } = memberValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Varify user exisit
  const matching_member = await memberships.one(req.body.phone);
  if (!matching_member) return res.status(400).send("member does not exist.");

  try {
    let result = await memberships.use_store_credit(
      req.body.phone,
      req.body.store_credit
    );
    res.send("current credit:", result.store_credit);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put("/deposit-insurance-credit", async (req, res, next) => {
  // Validate input
  const { error } = memberValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Varify user exisit
  const matching_member = await memberships.one(req.body.phone);
  if (!matching_member) return res.status(400).send("member does not exist.");

  try {
    let result = await memberships.deposit_insurance_credit(
      req.body.phone,
      req.body.insurance_credit
    );
    res.send("current credit:", result.insurance_credit);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put("/use-insurance-credit", async (req, res, next) => {
  // Validate input
  const { error } = memberValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Varify user exisit
  const matching_member = await memberships.one(req.body.phone);
  if (!matching_member) return res.status(400).send("member does not exist.");

  try {
    let result = await memberships.use_insurance_credit(
      req.body.phone,
      req.body.insurance_credit
    );
    res.send("current credit:", result.insurance_credit);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
