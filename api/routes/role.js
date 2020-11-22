"use strict";
var express = require("express");
const roles = require("../db/role.db");
var router = express.Router();

const Role = function (title, description) {
  this.title = title;
  this.description = description;
};

router.get("/", async (req, res, next) => {
  try {
    let result = await roles.all();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/:title", async (req, res, next) => {
  try {
    let result = await roles.one(req.params.title);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete("/:title", async (req, res, next) => {
  try {
    let result = await roles.delete(req.params.title);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/new-role", async (req, res, next) => {
  console.log("Creating new role", req.body);
  let new_role = new Role(
    req.body.title,
    req.body.description
  );
  console.log("sending new role:", new_role);
  try {
    let matching_role = await roles.one(req.body.title);
    if (!matching_role) {
      let result = await roles.new_role(new_role);
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

router.put("/update-role", async (req, res, next) => {
  try {
    let matching_role = await roles.one(req.body.title);
    if (matching_role) {
        let updated_role = new Role(
            req.body.title,
            req.body.description
          );
      console.log(
        "updating role",
        req.body.title,
        updated_role
      );
      let result = await roles.update_role(updated_role, req.body.title);
      res.send(result);
    } else {
      console.error(
        "can't update role info for non-exist role:",
        req.body.title
      );
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
