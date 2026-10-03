import './loadEnv';

const databaseUrl = process.env.DATABASE_URL || process.env.DIRECT_URL;
const jwtSecret = process.env.JWT_SECRET;

if (!databaseUrl) {
    throw new Error('Configuration error: DATABASE_URL or DIRECT_URL is required.');
}

process.env.DATABASE_URL = databaseUrl;

if (!jwtSecret) {
    throw new Error('Configuration error: JWT_SECRET is required.');
}

if (jwtSecret.length < 32) {
    throw new Error('Configuration error: JWT_SECRET must be at least 32 characters long.');
}