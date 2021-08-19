const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../src/middleware/auth");
require("../src/db/conn");
const Registration = require("../src/model/main");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", auth, (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userDetail = await Registration.findOne({ email });
    const verifyPassword = await bcrypt.compare(password, userDetail.password);

    if (verifyPassword) {
      const token = await userDetail.generateAuthToken();
      res.cookie("jwt", token, {
        // expires: new Date(Date.now() + 2000),
        httpOnly: true,
      });
      res.status(201).redirect("/home");
    } else {
      res.status(201).send("Invalid Password");
    }
  } catch (error) {
    res.status(404).send("invalid email");
  }
});

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

      // generating token
      const token = await userdata.generateAuthToken();

      res.cookie("jwt", token, {
        httpOnly: true,
      });

      const result = await userdata.save();
      res.status(201).redirect("/home");
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
