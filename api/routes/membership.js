'use strict';
var express = require("express");
const db = require('../db/membership');
var router = express.Router();


let Member = (phone, firstname, lastname, gender) => {
    this.phone = phone;
    this.firstname = firstname;
    this.lastname = lastname;
    this.gender = gender
}


router.get("/", async (req, res, next) => {
    try {
        let result = await db.all();
        res.json(result);
    }catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        let result = await db.one(req.params.phone);
        res.json(result);
    }catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;