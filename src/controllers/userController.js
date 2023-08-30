const { generateToken, verifyCredentials } = require('../services/authService');
const { storeToken, retrieveToken } = require('../utils/cache');

const login = async (req, res) => {
  const { username, password } = req.body;
  
  if(await verifyCredentials(username, password)) {
    const token = generateToken(username);
    storeToken(username, token);
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};

const getProfile = (req, res) => {
  res.json({
    message: 'This is a protected route!',
    user: req.user,
  });
};

module.exports = {
  login,
  getProfile,
};
