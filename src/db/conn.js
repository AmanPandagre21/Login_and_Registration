const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/user_registration", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connection Successfull...."))
  .catch((e) => console.log("Connection Lost.." + e));
