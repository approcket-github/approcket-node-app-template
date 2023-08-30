const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures usernames are unique
    minlength: 3, // Minimum length requirement
    maxlength: 50, // Maximum length requirement
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Add minimum length for better security
  },
});

userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
