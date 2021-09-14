const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for a user stored in the db
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  dateOfBirth: Date,
});

const user = mongoose.model("user", userSchema);

module.exports = user;
