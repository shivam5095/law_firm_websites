"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./env");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});
exports.default = prisma;
