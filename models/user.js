'use strict';
// const express= require('express'); 
const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');
// const User = require('../models/user');
// const router = express.Router();


const schema = new mongoose.Schema({
  fullname: { 
    type: String
  },
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

schema.set('toJSON', {
  virtuals: true, 
  transform: (doc, result) => {
    delete result._id; 
    delete result.__v; 
    delete result.password; 
  }
}); 

schema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};
schema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
  
};

module.exports = mongoose.model('User', schema); 

