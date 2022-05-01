const BirdMemory = require('../models/BirdMemory');
const fs = require('fs');

const postBirdMemory = (req, res) => {
  let new_img = new BirdMemory();
  console.log(req.file);
  new_img.img.data = fs.readFileSync(req.file.path);
  new_img.img.contentType = 'image/jpeg';
  new_img.img.species = req.file.originalname;
  // TODO: deal with avoiding saving images to API project folder
  new_img.save();
  res.json({ message: 'New image added to the db!' });
};

const removeBirdMemory = (req, res) => {};

const getBirdMemory = (req, res) => {
  BirdMemory.find({}, 'img createdAt', (err, images) => {
    if (err) {
      res.send(err);
    }

    let birdMemoriesMap = {};

    images.forEach((image) => {
      // use each image's _id from the db as a key for the image object value
      birdMemoriesMap[image._id] = image;
    });

    res.json(birdMemoriesMap);
  }).sort({ createdAt: 'desc' }); // sort by time img created
};

module.exports = { postBirdMemory, getBirdMemory };
