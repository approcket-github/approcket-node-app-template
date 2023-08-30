const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

// Dummy function for now
const verifyCredentials = async (username, password) => {
  return username === 'admin' && password === 'password';
};

const generateToken = (username) => {
  return jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
};

module.exports = {
  verifyCredentials,
  generateToken,
};
