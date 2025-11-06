const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const config = require('./config');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { helmetConfig, sanitizeInput, apiLimiter } = require('./middleware/security');

// Import routes
const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const progressRoutes = require('./routes/progressRoutes');

// Initialize express app
const app = express();

// Security middleware
app.use(helmetConfig);
app.use(cors(config.cors));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Input sanitization
app.use(sanitizeInput);

// Logging middleware
if (config.env === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Aithreya API is running',
    timestamp: new Date().toISOString(),
    environment: config.env
  });
});

// API routes
const API_VERSION = `/api/${config.apiVersion}`;

app.use(`${API_VERSION}/auth`, authRoutes);
app.use(`${API_VERSION}/content`, contentRoutes);
app.use(`${API_VERSION}/progress`, progressRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Aithreya API - Indian Constitution Education Platform',
    version: config.apiVersion,
    documentation: '/api/v1/docs'
  });
});

// 404 handler
app.use(notFound);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
