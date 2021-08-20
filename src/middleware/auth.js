const jwt = require("jsonwebtoken");
const Registration = require("../model/main");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const userAuth = await jwt.verify(token, process.env.SECRET_KEY);
    const userData = await Registration.findOne({ _id: userAuth._id });
    req.userData = userData;
    req.token = token;
    next();
  } catch (error) {
    res.redirect("/login");
  }
};

module.exports = auth;
