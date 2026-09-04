"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.careersStatusUpdateSchema = exports.internshipApplicationSchema = void 0;
const zod_1 = require("zod");
exports.internshipApplicationSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2, 'Full name must be at least 2 characters long'),
    email: zod_1.z.string().email('Invalid email address'),
    phone: zod_1.z.string().min(10, 'Phone number must be at least 10 characters long'),
    city: zod_1.z.string().min(2, 'City must be at least 2 characters long'),
    state: zod_1.z.string().min(2, 'State must be at least 2 characters long'),
    dateOfBirth: zod_1.z.string().optional().nullable().transform((val) => val ? new Date(val) : null),
    lawSchool: zod_1.z.string().min(2, 'Law School/University name is required'),
    course: zod_1.z.string().min(2, 'Current course description is required'),
    currentYear: zod_1.z.string().min(1, 'Current year/semester is required'),
    graduationYear: zod_1.z.preprocess((val) => (val ? parseInt(val, 10) : null), zod_1.z.number().nullable().optional()),
    cgpa: zod_1.z.string().optional().nullable(),
    areasOfInterest: zod_1.z.preprocess((val) => {
        if (typeof val === 'string') {
            try {
                return JSON.parse(val);
            }
            catch (_) {
                return val.split(',').map((s) => s.trim());
            }
        }
        return val;
    }, zod_1.z.array(zod_1.z.string()).min(1, 'At least one area of interest is required')),
    internshipMode: zod_1.z.string().min(2, 'Internship mode is required'),
    duration: zod_1.z.string().min(2, 'Duration is required'),
    startDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid start date format',
    }).transform((val) => new Date(val)),
    endDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid end date format',
    }).transform((val) => new Date(val)),
    previousExperience: zod_1.z.string().optional().nullable(),
    skills: zod_1.z.preprocess((val) => {
        if (typeof val === 'string') {
            try {
                return JSON.parse(val);
            }
            catch (_) {
                return val.split(',').map((s) => s.trim());
            }
        }
        return val;
    }, zod_1.z.array(zod_1.z.string())),
    motivation: zod_1.z.string().min(10, 'Why do you want to intern must be at least 10 characters'),
    additionalInformation: zod_1.z.string().optional().nullable(),
    honeypot: zod_1.z.string().optional(), // Honeypot field
});
exports.careersStatusUpdateSchema = zod_1.z.object({
    status: zod_1.z.enum([
        'SUBMITTED',
        'UNDER_REVIEW',
        'SHORTLISTED',
        'INTERVIEW',
        'ACCEPTED',
        'REJECTED',
        'WITHDRAWN',
    ], {
        errorMap: () => ({ message: 'Invalid application status value' }),
    }),
});
