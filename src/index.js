const express = require("express");
const app = express();
const Registration = require("./model/main");
const hbs = require("hbs");
const path = require("path");
const router = require("../routers/router");
const cookieParser = require("cookie-parser");
require("./db/conn");
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);

app.listen(port, () =>
  console.log(`Server is listening at the port number ${port}`)
);
