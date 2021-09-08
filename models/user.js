const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  dateOfBirth: Date,
});

const user = mongoose.model("user", userSchema);

module.exports = user;
