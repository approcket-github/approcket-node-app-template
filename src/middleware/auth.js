const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, 'YOUR_SECRET_KEY');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
