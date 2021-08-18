const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
require("../db/conn");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: { type: Number, trim: true },
  birthdate: {
    type: Date,
  },
  gender: {
    type: String,
    trim: true,
  },

  password: {
    type: String,
    trim: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Registration = new mongoose.model("Registration", userSchema);

module.exports = Registration;