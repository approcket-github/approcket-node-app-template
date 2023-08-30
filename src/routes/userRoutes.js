const express = require('express');
const authenticateJWT = require('../middleware/auth');
const { login, getProfile } = require('../controllers/userController');

const router = express.Router();

router.post('/login', login);
router.get('/profile', authenticateJWT, getProfile);

module.exports = router;
