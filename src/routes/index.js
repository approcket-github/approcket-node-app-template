const express = require('express');
const authRoutes = require('./authRoutes'); // Update the path as per your directory structure

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
