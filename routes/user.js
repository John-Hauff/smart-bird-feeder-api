const express = require("express");
const user = require("../models/user");
// password encryption module
const bcrypt = require("bcrypt");

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
  } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name entered",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid email entered",
    });
  } else if (!new Date(dateOfBirth).getTime()) {
    res.json({
      status: "FAILED",
      message: "Invalid date of birth entered",
    });
  } else if (password.length < 8) {
    res.json({
      status: "FAILED",
      message: "Password must be at least 8 characters in length",
    });
  } else {
    // Check for existing user using userModel
    user
      .find({ email })
      .then((result) => {
        if (result.length) {
          // user exists already
          res.json({
            status: "FAILED",
            message: "A user already exists with the provided email address",
          });
        } else {
          // New user -> store info in db
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new user({
                name,
                email,
                password: hashedPassword,
                dateOfBirth,
              });

              newUser
                .save()
                .then((signupResult) => {
                  res.json({
                    status: "SUCCESSS",
                    message: "Signup successful",
                    data: signupResult,
                  });
                })
                .catch((err) =>
                  res.json({
                    status: "FAILED",
                    message: "Error occurred while saving user account",
                  })
                );
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An error occurred while hashing password",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "Error has occurred while checking for existing user",
        });
      });
  }
});

// Sign in
router.post("/signin", (req, res) => {});

module.exports = router;
