const express = require('express');
const path = require('path');

const router = express.Router();

const userController = require('../controllers/user');
const birdMemoriesController = require('../controllers/BirdMemories');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    // Use callback function to store image in specified local dir
    cb(null, path.join(__dirname, '../bird_memory_uploads/'));
  },
});

const upload = multer({ storage: storage });

// Signup
router.post('/signup', userController.signup);
// Sign in
router.post('/signin', userController.signin);
// Upload bird memories for a user
router.post(
  '/post-bird-memory',
  upload.single('file'),
  birdMemoriesController.postBirdMemory
);
// Route for deleting a bird memory
router.post('/delete-bird-memory', birdMemoriesController.deleteBirdMemory);
// Get the bird memories for a user
router.get('/get-bird-memory', birdMemoriesController.getBirdMemory);

module.exports = router;
