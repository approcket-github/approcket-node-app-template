const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send('Username already exists');
    }

    const user = new User({
      username,
      password,
    });

    await user.save();
    res.status(201).send('User registered successfully');

  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(409).send('Username already exists');
    }
    if (error.name === 'ValidationError') {
      return res.status(400).send(error.message);
    }
    return res.status(500).send('Internal server error');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid username or password');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid username or password');

    const token = jwt.sign({ _id: user._id }, 'YOUR_SECRET_KEY');
    res.status(200).header('Authorization', `Bearer ${token}`).send(token);
    
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

exports.logout = (req, res) => {
  // Logic for logging out, usually done on client-side (remove JWT token)
  res.status(200).send('User logged out');
};
