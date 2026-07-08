import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev')); // Log HTTP requests

// Security and content type headers middleware
app.use((req, res, next) => {
  // Security headers
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
  
  // Cache control
  res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  
  // Remove problematic headers
  res.removeHeader('X-Powered-By');
  res.removeHeader('X-XSS-Protection');
  res.removeHeader('Expires');
  res.removeHeader('Pragma');
  
  next();
});

// Handle successful responses
app.use((req, res, next) => {
  const oldJson = res.json;
  res.json = function(data) {
    if (!res.statusCode || res.statusCode === 200) {
      res.status(200);
    }
    return oldJson.call(this, data);
  };
  next();
});

// Log all incoming requests body
app.use((req, res, next) => {
  if (req.body) {
    console.log('Request body:', req.body);
  }
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 