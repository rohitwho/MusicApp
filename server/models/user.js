const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    //Mae
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    // reference comment schema
  ]
});

const Thought = model('User', userSchema);

module.exports = User;
