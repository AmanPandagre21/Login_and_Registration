const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
require("../src/db/conn");
const Registration = require("../src/model/main");

router.get("/", (req, res) => {
  res.render("index");
});

// router.get("/register", (req, res) => {
//   res.send("register");
// });

router.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if (password === cpassword) {
      const userdata = new Registration({
        firstname: req.body.fname,
        lastname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        birthdate: req.body.bday,
        gender: req.body.gender,
        password: password,
      });
      const result = await userdata.save();
      res.status(201).render("home");
    } else {
      res.send("password and confirm password are not matching");
    }
  } catch (error) {
    res.status(404).send("error");
  }
});

router.get("*", (req, res) => {
  res.send("404 ERROR PAGE");
});

module.exports = router;
