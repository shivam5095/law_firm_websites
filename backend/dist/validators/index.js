"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusUpdateSchema = exports.consultationSchema = exports.contactSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
});
exports.contactSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters long'),
    email: zod_1.z.string().email('Invalid email address'),
    phone: zod_1.z.string().optional().nullable(),
    subject: zod_1.z.string().min(3, 'Subject must be at least 3 characters long'),
    message: zod_1.z.string().min(10, 'Message must be at least 10 characters long'),
});
exports.consultationSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters long'),
    email: zod_1.z.string().email('Invalid email address'),
    phone: zod_1.z.string().min(10, 'Phone number must be at least 10 digits/characters long'),
    matterType: zod_1.z.string().min(2, 'Please select the nature of your matter'),
    preferredMode: zod_1.z.enum(['Office', 'Phone', 'Video'], {
        errorMap: () => ({ message: 'Preferred mode must be Office, Phone, or Video' }),
    }),
    preferredDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid preferred date format',
    }),
    message: zod_1.z.string().optional().nullable(),
});
exports.statusUpdateSchema = zod_1.z.object({
    status: zod_1.z.enum(['NEW', 'CONTACTED', 'IN_PROGRESS', 'CLOSED'], {
        errorMap: () => ({ message: 'Status must be NEW, CONTACTED, IN_PROGRESS, or CLOSED' }),
    }),
});
