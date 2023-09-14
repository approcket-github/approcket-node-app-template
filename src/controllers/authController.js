const express = require('express');
const User = require('../models/userModel');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 8;


if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables.");
    process.exit(1); 
}

/// Registers a new user
const register = async (req, res) => {
  try {
      const { username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.status(409).json({ message: 'Username already exists' });
      }

      const user = new User({
          username,
          password,
      });

      await user.save();
      res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
      console.error("Error during registration:", error);
      switch (error.name) {
          case 'MongoError':
              if (error.code === 11000) {
                  return res.status(409).json({ message: 'Username already exists' });
              }
              break;
          case 'ValidationError':
              return res.status(400).json({ message: error.message });
          default:
              return res.status(500).json({ message: 'Internal server error' });
      }
  }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid username or password' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid username or password' });

        //Change expiry time if needed
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).header('Authorization', `Bearer ${token}`).json({ token });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logout = (req, res) => {
    // Logic for logging out to be done on the client-side (remove JWT token)
    res.status(200).json({ message: 'User logged out' });
};

module.exports = {
    register,
    login,
    logout
};
