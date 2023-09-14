const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

const mongoURI = process.env.MONGO_DB_URL;
const PORT= process.env.PORT

app.use(express.json());

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', authRoutes);

app.listen(PORT, () => {
 console.log('Server running on port 3000');
});
