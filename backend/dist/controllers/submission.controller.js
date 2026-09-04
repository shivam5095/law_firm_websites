"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContact = createContact;
exports.createConsultation = createConsultation;
const db_1 = __importDefault(require("../config/db"));
const validators_1 = require("../validators");
const email_service_1 = require("../services/email.service");
async function createContact(req, res, next) {
    try {
        const parseResult = validators_1.contactSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: parseResult.error.errors.map((e) => ({
                    field: e.path.join('.'),
                    message: e.message,
                })),
            });
        }
        const { name, email, phone, subject, message } = parseResult.data;
        const contact = await db_1.default.contactMessage.create({
            data: {
                name,
                email,
                phone,
                subject,
                message,
                status: 'NEW',
            },
        });
        // Send email notification (asynchronous)
        (0, email_service_1.sendContactNotification)({ name, email, phone, subject, message }).catch(console.error);
        return res.status(201).json({
            success: true,
            message: 'Message sent successfully. We will contact you soon.',
            data: contact,
        });
    }
    catch (error) {
        next(error);
    }
}
async function createConsultation(req, res, next) {
    try {
        const parseResult = validators_1.consultationSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: parseResult.error.errors.map((e) => ({
                    field: e.path.join('.'),
                    message: e.message,
                })),
            });
        }
        const { name, email, phone, matterType, preferredMode, preferredDate, message } = parseResult.data;
        const request = await db_1.default.consultationRequest.create({
            data: {
                name,
                email,
                phone,
                matterType,
                preferredMode,
                preferredDate: new Date(preferredDate),
                message,
                status: 'NEW',
            },
        });
        // Send email notification (asynchronous)
        (0, email_service_1.sendConsultationNotification)({
            name,
            email,
            phone,
            matterType,
            preferredMode,
            preferredDate: new Date(preferredDate),
            message,
        }).catch(console.error);
        return res.status(201).json({
            success: true,
            message: 'Consultation request submitted successfully.',
            data: request,
        });
    }
    catch (error) {
        next(error);
    }
}
