const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
},
avatar: {
  type: String,
  required: false,
  validate: {
    validator(value) {
      // Allow empty string or valid URL
      return value === "" || validator.isURL(value);
    },
    message: 'You must enter a valid URL'
  },
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
  select: false,
},
}, {
  versionKey: false,
  timestamps: true,
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }
          return user;
        });
    });
}
module.exports = mongoose.model('user', userSchema);