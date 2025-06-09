const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
},
avatar: {
  type: String,
  required: true,
  validate: {
     validator(value) {
    return validator.isURL(value);
  },
  message: 'You must enter a valid URL'
  },
  default: "https://practicum-content.s3.us-west-1.amazonaws.com/avatars/default-avatar.png",
},
email: {
  type: String,
  required: true,
  unique: true,
  validate: {
    validator: (v) => validator.isEmail(v),
    message: 'You must enter a valid email',
  }
},
password: {
  type: String,
  required: true,
},
}, {
  versionKey: false,
  timestamps: true, // Automatically add createdAt and updatedAt fields
});
module.exports = mongoose.model('user', userSchema);