import { z } from 'zod';

export const MAX_RESUME_SIZE_BYTES = 4 * 1024 * 1024;
export const resumeSizeSchema = z.number().max(MAX_RESUME_SIZE_BYTES, 'Resume must be 4 MB or smaller.');

export const careerApplicationSchema = z.object({
    fullName: z.string().trim().min(2, 'Full name must be at least 2 characters long').max(120),
    email: z.string().trim().email('Invalid email address').max(254),
    phone: z.string().trim().min(10, 'Phone number must be at least 10 characters long').max(30),
    practiceArea: z.enum([
        'Banking & Finance',
        'Debt Restructuring',
        'Arbitration & Dispute Resolution',
        'Project & Infrastructure Disputes',
        'Commercial Disputes',
        'Insolvency & Financial Distress',
    ]),
    message: z.string().trim().min(10, 'Please provide a brief background').max(3000),
    consent: z.literal(true, { errorMap: () => ({ message: 'Consent is required' }) }),
    honeypot: z.string().optional(),
});