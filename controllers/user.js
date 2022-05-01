const user = require('../models/user');
// password encryption module
const bcrypt = require('bcrypt');

const signup = (req, res) => {
  // Get input from request body
  let { name, email, password, dateOfBirth } = req.body;
  // Trim off whitespace
  name = name.trim();
  email = email.trim().toLowerCase();
  password = password.trim();
  dateOfBirth = dateOfBirth.trim();

  // Check for empty fields
  if (name == '' || email == '' || password == '' || dateOfBirth == '') {
    res.json({
      status: 'FAILED',
      message: 'Empty input field(s)',
    });
  } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid name entered',
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid email entered',
    });
  } else if (!new Date(dateOfBirth).getTime()) {
    res.json({
      status: 'FAILED',
      message: 'Invalid date of birth entered',
    });
  } else if (password.length < 8) {
    res.json({
      status: 'FAILED',
      message: 'Password must be at least 8 characters in length',
    });
  } else {
    // Check for existing user using userModel
    user
      .find({ email }) // Find all users w/ specified email
      .then((result) => {
        // {result} contains all users found matching the email provided,
        // or {result} is null
        if (result.length) {
          // user exists already
          res.json({
            status: 'FAILED',
            message: 'A user already exists with the provided email address',
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
                    status: 'SUCCESS',
                    message: 'Signup successful',
                    data: signupResult,
                  });
                })
                .catch((err) =>
                  res.json({
                    status: 'FAILED',
                    message: 'Error occurred while saving user account',
                  })
                );
            })
            .catch((err) => {
              res.json({
                status: 'FAILED',
                message: 'An error occurred while hashing password',
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: 'FAILED',
          message: 'Error has occurred while checking for existing user',
        });
      });
  }
};

const signin = (req, res) => {
  // Get input from request body
  let { email, password } = req.body;
  // Trim off whitespace
  email = email.trim().toLowerCase();
  password = password.trim();

  // Check for empty fields
  if (email == '') {
    res.json({
      status: 'FAILED',
      message: 'Email not provided',
    });
  } else if (password == '') {
    res.json({
      status: 'FAILED',
      message: 'Password not provided',
    });
  } else {
    // Check if user exists
    user
      .find({ email })
      .then((data) => {
        if (data.length > 0) {
          // User found
          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                // Password match
                res.json({
                  status: 'SUCCESS',
                  message: 'Sign in successful',
                  data: data,
                });
              } else {
                res.json({
                  status: 'FAILED',
                  message: 'Invalid password entered',
                });
              }
            })
            .catch((err) => {
              res.json({
                status: 'FAILED',
                message: 'An error occured while validating password',
              });
            });
        } else {
          res.json({
            status: 'FAILED',
            message: 'Invalid email or password provided',
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 'FAILED',
          message: 'An error occurred while checking for existing user',
        });
      });
  }
};

module.exports = { signup, signin };
