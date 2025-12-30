/**
 * EcoTrack API Server - Entry Point
 * 
 * This is the main entry point for the Express.js backend server.
 * It handles:
 * - Environment configuration
 * - Database connection
 * - Middleware setup
 * - Route mounting
 * - Error handling
 * 
 * @author Hasaan Badar
 * @version 1.0.0
 */

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// ============ CONFIGURATION ============
// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Initialize Express application
const app = express();

// ============ MIDDLEWARE ============
// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Enable CORS for frontend communication
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============ API ROUTES ============
/**
 * Root endpoint - API health check
 * Returns API information and available endpoints
 */
app.get('/', (req, res) => {
    res.json({
        message: 'EcoTrack API is running',
        version: '1.0.0',
        author: 'Hasaan Badar',
        endpoints: {
            auth: '/api/auth - Authentication endpoints',
            products: '/api/products - Product CRUD operations',
            orders: '/api/orders - Order management',
            payments: '/api/payment - Payment processing'
        }
    });
});

// Mount route handlers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));

// ============ ERROR HANDLING ============
/**
 * Global error handling middleware
 * Catches all errors and returns a standardized response
 */
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

/**
 * 404 handler - Catches all unmatched routes
 */
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// ============ SERVER START ============
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
  ╔════════════════════════════════════════╗
  ║     EcoTrack API Server Started        ║
  ╠════════════════════════════════════════╣
  ║  Port: ${PORT}                            ║
  ║  Mode: ${process.env.NODE_ENV || 'development'}                    ║
  ║  API:  http://localhost:${PORT}           ║
  ╚════════════════════════════════════════╝
  `);
});
