const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  },
  image: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  username:{
    type:String
  },
  image:{
    type:String
  },
  bio:{
    type:String
  },
  following:{
    type:Boolean,
    required:true
  }
});

module.exports = users = mongoose.model('users', UserSchema);
