const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: 'Введён не допустимый email',
      },
    },
    password: {
      type: String,
      select: false,
      minlength: 6,
      required: true,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
