const mongoose = require("mongoose");

// Define a schema
var Schema = mongoose.Schema;

// Create an admin schema
var adminSchema = new Schema({
  name: { type: String, required: true }, // admin name
  mobile: { type: String, required: true }, // admin mobile number
  email: { type: String, required: true }, // admin email id
  profilePic: { type: Schema.Types.ObjectId, ref: 'Image' }, // public id of profile picture
  userId: { type: String, required: true, unique: true } // admin user id
});

// Create an image schema
var imageSchema = new Schema({
  publicId: { type: String, required: true, unique: true }, // public id of the image
  url: { type: String, required: true } // url of the image
});

// Create models from the schemas
var Admin = mongoose.model('Admin', adminSchema);
var Image = mongoose.model('Image', imageSchema);

// Export the models
module.exports = { Admin, Image };
