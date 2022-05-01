const BirdMemory = require('../models/BirdMemory');
const fs = require('fs');

const postBirdMemory = (req, res) => {
  let new_img = new BirdMemory();
  console.log(req.file);
  new_img.img.data = fs.readFileSync(req.file.path);
  new_img.img.contentType = 'image/jpeg';
  new_img.img.species = req.file.originalname;
  // TODO: deal with avoiding saving images to API project folder
  new_img.save((err) => {
    if (err) console.log(err);
    // document is saved if no errors
  });
  res.json({ message: 'New image added to the db!' });
};

const deleteBirdMemory = (req, res) => {
  // console.log('req = ', req);
  console.log('req.createdAt = ', req.createdAt);

  BirdMemory.findOneAndDelete({ createdAt: req.body.createdAt }, (err, doc) => {
    if (err) console.log(err);
    else if (doc == null)
      console.log(
        'MongoDB document with createdAt: ' + req.body.createdAt + ' not found.'
      );
    else
      console.log('Successfully deleted mongoDB document with _id: ', doc._id);
  });

  // Send response back to the requester as a JSON body
  res.json();
};

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

module.exports = { postBirdMemory, deleteBirdMemory, getBirdMemory };
