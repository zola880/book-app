const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for Flutter
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/books', bookRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('BookSocial API is running...');
});

module.exports = app;
