const express = require('express');
const mongoose = require('mongoose');
const MongoAdapter = require('./adapters/mongoAdapter'); 
const SQLAdapter = require('./adapters/sqlAdapter'); 
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

// Initialize the appropriate DB adapter
let adapter;
if (process.env.DB_TYPE === 'SQL') {
  adapter = new SQLAdapter();
  // TODO: SQL Database connection logic here
} else if (process.env.DB_TYPE === 'MongoDB') {
  adapter = new MongoAdapter();
  mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
} else {
  console.error('Invalid DB_TYPE in .env file');
  process.exit(1);
}

// Pass the adapter to your routes
const authRoutes = require('./routes/authRoutes')(adapter);

app.use('/api', authRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
