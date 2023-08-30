const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const user = new User({
    username,
    password,
  });

  await user.save();

  res.status(201).send('User registered');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('Invalid username or password');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid username or password');

  const token = jwt.sign({ _id: user._id }, 'YOUR_SECRET_KEY');
  res.header('Authorization', `Bearer ${token}`).send(token);
};

exports.logout = (req, res) => {
  // Logic for logging out, usually on client-side (remove JWT token)
  res.send('User logged out');
};
