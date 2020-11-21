"use strict";
var express = require("express");
const services = require("../db/service");
var router = express.Router();

const Service = function (
  name,
  description,
  time_length,
  regular_cost,
  insurance_cost
) {
  this.name = name;
  this.description = description;
  this.time_length = time_length;
  this.regular_cost = regular_cost;
  this.insurance_cost = insurance_cost;
};

router.get("/", async (req, res, next) => {
  try {
    let result = await services.all();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/find", async (req, res, next) => {
  try {
    let result = await services.find(req.body.name, req.body.time_length);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/new-service", async (req, res, next) => {
  console.log("Creating new service", req.body);
  try {
    let matching_service = await services.find(req.body.name, req.body.time_length);
    if (matching_service) {
      console.error("can't create duplicate service:", [
        req.body.name,
        req.body.time_length,
      ]);
      res.sendStatus(403);
      l;
    } else {
      let new_service = new Service(
        req.body.name,
        req.body.description,
        req.body.time_length,
        req.body.regular_cost,
        req.body.insurance_cost
      );
      console.log("sending new service:", new_service);
      let result = await services.new_service(new_service);
      res.send(result);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put("/update-service", async (req, res, next) => {
  try {
    let matching_service = await services.find(req.body.name, req.body.time_length);
    console.log(matching_service);
    if (matching_service) {
      let updated_service = new Service(
        req.body.name,
        req.body.new_description || req.body.description,
        req.body.time_length,
        req.body.new_regular_cost || req.body.regular_cost,
        req.body.new_insurance_cost || req.body.insurance_cost
      );
      console.log("sending new service:", updated_service);
      let result = await services.update_service(updated_service, req.body.name, req.body.time_length);
      res.send(result);
    } else {
      console.error("can't update non exist service:", req.body.name);
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
