const BirdMemory = require("../models/BirdMemory");
const fs = require("fs");

const postBirdMemory = (req, res) => {
  let new_img = new BirdMemory();
  new_img.img.data = fs.readFileSync(req.file.path);
  new_img.img.contentType = "image/jpeg";
  new_img.save();
  res.json({ message: "New image added to the db!" });
};

// TODO: fill getBirdMemory function
const getBirdMemory = () => {};

module.exports = { postBirdMemory, getBirdMemory };
