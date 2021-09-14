const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for a bird image in the db
const birdMemorySchema = new Schema(
  {
    // Store an image with the Buffer SchemaType
    img: { data: Buffer, contentType: String },
  },
  {
    // auto-save create & update times in db
    timestamps: true,
  }
);

module.exports = mongoose.model("BirdMemory", birdMemorySchema);
