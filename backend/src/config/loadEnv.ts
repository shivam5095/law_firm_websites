import { existsSync } from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';

if (!process.env.VERCEL) {
    const envPath = path.resolve(__dirname, '../../.env');
    if (existsSync(envPath)) {
        dotenv.config({ path: envPath });
    }
}