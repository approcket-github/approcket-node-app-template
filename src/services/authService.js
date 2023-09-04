const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const verifyCredentials = async (username, password) => {
    
    const user = await User.findOne({ username });
     
    if (!user) {
      return false;
    }   
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch; 
  };
  
const generateToken = (username) => {
  return jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
};

module.exports = {
  verifyCredentials,
  generateToken,
};
