// require MongoDB
require('./config/db');
require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const userRouter = require('./routes/user');

const bodyParser = express.json;
app.use(bodyParser());

// Specify the start of the path for the user router
app.use('/user', userRouter);

app.listen(PORT, () =>
  console.log(`Server started and running on port ${PORT}`)
);
