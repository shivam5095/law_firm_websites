"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.careerApplicationSchema = exports.resumeSizeSchema = exports.MAX_RESUME_SIZE_BYTES = void 0;
const zod_1 = require("zod");
exports.MAX_RESUME_SIZE_BYTES = 4 * 1024 * 1024;
exports.resumeSizeSchema = zod_1.z.number().max(exports.MAX_RESUME_SIZE_BYTES, 'Resume must be 4 MB or smaller.');
exports.careerApplicationSchema = zod_1.z.object({
    fullName: zod_1.z.string().trim().min(2, 'Full name must be at least 2 characters long').max(120),
    email: zod_1.z.string().trim().email('Invalid email address').max(254),
    phone: zod_1.z.string().trim().min(10, 'Phone number must be at least 10 characters long').max(30),
    practiceArea: zod_1.z.enum([
        'Banking & Finance',
        'Debt Restructuring',
        'Arbitration & Dispute Resolution',
        'Project & Infrastructure Disputes',
        'Commercial Disputes',
        'Insolvency & Financial Distress',
    ]),
    message: zod_1.z.string().trim().min(10, 'Please provide a brief background').max(3000),
    consent: zod_1.z.literal(true, { errorMap: () => ({ message: 'Consent is required' }) }),
    honeypot: zod_1.z.string().optional(),
});
