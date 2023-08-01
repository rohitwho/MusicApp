const { Schema, model } = require('mongoose');
const comments = require('./comments')

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    comments
  ],
friends:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]
    
});
userSchema.virtual('friendCount').get(function(){
    return this.friends.length
});
const User = model('User', userSchema);

module.exports = User;
