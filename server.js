// require MongoDB
require("./config/db");

const express = require("express");
const app = express();
const PORT = 3000;

const userRouter = require("./routes/user");

const bodyParser = require("express").json;
app.use(bodyParser());

app.use("/user", userRouter);

app.listen(PORT, () =>
  console.log(`Server started and running on port ${PORT}`)
);
