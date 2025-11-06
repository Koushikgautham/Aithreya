const app = require('./app');
const config = require('./config');
const { connectDB } = require('./config/database');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  console.error(err.stack);
  process.exit(1);
});

// Connect to database
connectDB();

// Start server
const PORT = config.port;
const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🕉️  Āithreya API Server Running                        ║
║                                                           ║
║   Environment: ${config.env.padEnd(43)}║
║   Port: ${PORT.toString().padEnd(50)}║
║   API Version: ${config.apiVersion.padEnd(44)}║
║                                                           ║
║   Health Check: http://localhost:${PORT}/health${' '.repeat(18)}║
║   API Endpoint: http://localhost:${PORT}/api/${config.apiVersion}${' '.repeat(13)}║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  console.error(err.stack);
  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated!');
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT RECEIVED. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated!');
  });
});

module.exports = server;
