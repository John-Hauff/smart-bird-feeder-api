const express = require("express");
const user = require("../models/user");
// password encryption module
const bcrypt = require("bcrypt");

const router = express.Router();

const controller = require("../controllers/user");

// TODO: might want to move the (req, res) controllers out of this file
// Signup
router.post("/signup", controller.signup);
// Sign in
router.post("/signin", controller.signin);

module.exports = router;
