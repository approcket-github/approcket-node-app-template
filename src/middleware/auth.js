const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) return res.status(401).send('Access Denied');

  const token = authHeader.replace('Bearer ', '');

  try {
    const verified = jwt.verify(token, 'YOUR_SECRET_KEY');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
