const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const verifyCredentials = async (username, password) => {
    // Find the user by username
    const user = await User.findOne({ username });
    
    // If user not found, return false
    if (!user) {
      return false;
    }
    
    // If user is found, compare the hashed password with the provided password
    const isMatch = await bcrypt.compare(password, user.password);
    
    return isMatch; // This will return true if the password matches, false otherwise
  };
  
const generateToken = (username) => {
  return jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
};

module.exports = {
  verifyCredentials,
  generateToken,
};
