const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const errorMiddleware = require('./src/middleware/errorMiddleware');
const rateLimit = require('express-rate-limit');

dotenv.config();
connectDB();

const app = require('./src/app');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// Logging – try to use morgan if installed, otherwise fallback to simple logger
let morgan;
try {
  morgan = require('morgan');
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    // Even in production, you might want minimal logging
    app.use(morgan('combined'));
  }
} catch (err) {
  console.log('⚠️ Morgan not installed. Using simple console logger.');
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
  });
}

// Error middleware (must be last)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));