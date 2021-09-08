const express = require("express");

const router = express.Router();

// TODO: might want to move the (req, res) controllers out of this file
// Signup
router.post("/signup", (req, res) => {
  // Get input from request body
  let { name, email, password, dateOfBirth } = req.body;
  // Trim off whitespace
  name = name.trim();
  email = email.trim();
  password = password.trim();
  dateOfBirth = dateOfBirth.trim();

  if (name === "" || email === "" || password === "" || dateOfBirth === "") {
    res.json({
      status: "FAILED",
      message: "Empty input field(s)",
    });
  } else if (!/^[a-zA-Z]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name entered",
    });
  }
});

// Sign in
router.post("/signin", (req, res) => {});

module.exports = router;
