const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const config = require('../config/config.prod');
const secret = require('../config/secret');
const jwt = require('jsonwebtoken');

// Validate Function to check if valid e-mail format
let validEmailChecker = (email) => {
  if (!email) {
    return false;
  } else {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email);
  }
};

// Email Validators
const emailValidators = [{
  validator: validEmailChecker,
  message: 'Email invalide'
}];

// User schema
const userSchema = new Schema({
  nom: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },
  prenom: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 150
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: emailValidators,
    minlength: 6,
    maxlength: 100
  }
});

// Middleware to encrypt password on save User
userSchema.pre('save', function (next) {
  if (!this.isModified('password'))
    return next();

  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

// Middleware to encrypt password on update User
userSchema.pre('update', function (next) {
  bcrypt.hash(this.getUpdate().$set.password, null, null, (err, hash) => {
    if (err) return next(err);
    console.log(this.getUpdate().$set.password);
    this.update({}, {
      $set: {
        password: hash
      }
    });
    next();
  });
});

// Compare password with encryted password in database
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Generate Json Web Token
userSchema.methods.generateToken = function (_id) {
  // Set expiration date to date.now() + 7 days
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    userId: _id,
    exp: parseInt(expiry.getTime() / 1000),
  }, secret.secret);
};

module.exports = mongoose.model('User', userSchema);