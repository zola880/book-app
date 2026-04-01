const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const bookRoutes = require('./routes/bookRoutes'); // extended

const app = express();

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/books', bookRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;