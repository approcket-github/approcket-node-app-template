const express = require('express');
const authMiddleware = require('../middleware/auth');

module.exports = (adapter) => {
  const router = express.Router();
  const authController = require('../controllers/authController')(adapter);

  router.post('/register', authController.register);
  router.post('/login', authController.login);
  router.post('/logout', authMiddleware, authController.logout);

  return router;
};
