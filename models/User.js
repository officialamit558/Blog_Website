// models/User.js

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Plugin for integrating Passport.js local authentication
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
