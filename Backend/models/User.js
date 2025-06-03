// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensure no duplicate emails
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }); // adds createdAt, updatedAt fields

const User = mongoose.model('User', userSchema);
module.exports = User;
