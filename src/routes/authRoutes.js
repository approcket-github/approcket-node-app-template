const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const { register, login, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Set various security headers
router.use(helmet());

// Sanitize data to prevent NoSQL injection attacks
router.use(mongoSanitize());

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);  // Protected route

module.exports = router;
