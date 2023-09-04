// authController.js

module.exports = function(adapter) {

  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');

  const register = async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check for existing user
      const existingUser = await adapter.findUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
      }

      await adapter.createUser(username, password);

      res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const login = async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await adapter.findUserByUsername(username);
      if (!user) return res.status(400).json({ message: 'Invalid username or password' });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).json({ message: 'Invalid username or password' });

      const token = jwt.sign({ _id: user._id }, 'YOUR_SECRET_KEY');
      res.status(200).header('Authorization', `Bearer ${token}`).json({ token });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const logout = (req, res) => {
    // Logic for logging out, usually done on client-side (remove JWT token)
    res.status(200).json({ message: 'User logged out' });
  };

  return {
    register,
    login,
    logout,
  };
};
