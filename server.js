// require MongoDB
require("./config/db");
require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const userRouter = require("./routes/user");

const bodyParser = require("express").json;
app.use(bodyParser());

app.use("/user", userRouter);

app.listen(PORT, () =>
  console.log(`Server started and running on port ${PORT}`)
);
