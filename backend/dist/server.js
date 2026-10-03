"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/env");
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
if (!process.env.VERCEL) {
    if (process.env.NODE_ENV !== 'production') {
        try {
            const databaseUrl = new URL(process.env.DATABASE_URL);
            console.log(`[Server] Database host=${databaseUrl.hostname} port=${databaseUrl.port || '5432'}`);
        }
        catch {
            console.log('[Server] Database host and port unavailable');
        }
    }
    const PORT = process.env.PORT || 5000;
    const server = app_1.default.listen(PORT, () => {
        console.log(`[Server] Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        console.log(`[Server] Health check: http://localhost:${PORT}/api/health`);
    });
    const shutdown = async (signal) => {
        console.log(`[Server] Received ${signal}. Shutting down gracefully...`);
        server.close(async () => {
            console.log('[Server] HTTP server closed.');
            try {
                await db_1.default.$disconnect();
                console.log('[Server] Database connections disconnected.');
                process.exit(0);
            }
            catch (error) {
                console.error('[Server] Error disconnecting database client:', error);
                process.exit(1);
            }
        });
    };
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
}
exports.default = app_1.default;
