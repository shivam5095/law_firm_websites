import './config/env';
import app from './app';
import prisma from './config/db';

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`[Server] Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`[Server] Health check: http://localhost:${PORT}/api/health`);
  });

  const shutdown = async (signal: string) => {
    console.log(`[Server] Received ${signal}. Shutting down gracefully...`);

    server.close(async () => {
      console.log('[Server] HTTP server closed.');

      try {
        await prisma.$disconnect();
        console.log('[Server] Database connections disconnected.');
        process.exit(0);
      } catch (error) {
        console.error('[Server] Error disconnecting database client:', error);
        process.exit(1);
      }
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

export default app;
