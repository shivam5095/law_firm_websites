import * as dotenv from 'dotenv';
import * as path from 'path';

// Load env variables from root of backend
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import app from './app';
import prisma from './config/db';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[Server] Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`[Server] Health check: http://localhost:${PORT}/api/health`);
});

// Clean shutdown handlers
const shutdown = async (signal: string) => {
  console.log(`[Server] Received ${signal}. Shutting down gracefully...`);
  
  server.close(async () => {
    console.log('[Server] HTTP server closed.');
    
    try {
      await prisma.$disconnect();
      console.log('[Server] Database connections disconnected.');
      process.exit(0);
    } catch (err) {
      console.error('[Server] Error disconnecting database client:', err);
      process.exit(1);
    }
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
