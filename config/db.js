require("dotenv").config(); // loads .env contents into process.env

const mongoose = require("mongoose");

// Mongoose will enforce the object schemas we give it
// and translates our code to be represented on MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));
