"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContacts = getContacts;
exports.getContactById = getContactById;
exports.updateContactStatus = updateContactStatus;
exports.deleteContact = deleteContact;
exports.getConsultations = getConsultations;
exports.getConsultationById = getConsultationById;
exports.updateConsultationStatus = updateConsultationStatus;
exports.deleteConsultation = deleteConsultation;
const db_1 = __importDefault(require("../config/db"));
const validators_1 = require("../validators");
// ----------------------------------------------------
// Contacts Handlers
// ----------------------------------------------------
async function getContacts(req, res, next) {
    try {
        const { status, search } = req.query;
        const whereClause = {};
        if (status) {
            whereClause.status = String(status);
        }
        if (search) {
            const searchStr = String(search);
            whereClause.OR = [
                { name: { contains: searchStr, mode: 'insensitive' } },
                { email: { contains: searchStr, mode: 'insensitive' } },
                { subject: { contains: searchStr, mode: 'insensitive' } },
                { message: { contains: searchStr, mode: 'insensitive' } },
            ];
        }
        const contacts = await db_1.default.contactMessage.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
        });
        return res.status(200).json({
            success: true,
            message: 'Contacts retrieved successfully.',
            data: contacts,
        });
    }
    catch (error) {
        next(error);
    }
}
async function getContactById(req, res, next) {
    try {
        const { id } = req.params;
        const contact = await db_1.default.contactMessage.findUnique({
            where: { id },
        });
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found.',
                errors: [],
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Contact message retrieved successfully.',
            data: contact,
        });
    }
    catch (error) {
        next(error);
    }
}
async function updateContactStatus(req, res, next) {
    try {
        const { id } = req.params;
        const parseResult = validators_1.statusUpdateSchema.safeParse(req.body);
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
        const { status } = parseResult.data;
        const contact = await db_1.default.contactMessage.findUnique({
            where: { id },
        });
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found.',
                errors: [],
            });
        }
        const updated = await db_1.default.contactMessage.update({
            where: { id },
            data: { status },
        });
        return res.status(200).json({
            success: true,
            message: `Contact message status updated to ${status}.`,
            data: updated,
        });
    }
    catch (error) {
        next(error);
    }
}
async function deleteContact(req, res, next) {
    try {
        const { id } = req.params;
        const contact = await db_1.default.contactMessage.findUnique({
            where: { id },
        });
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found.',
                errors: [],
            });
        }
        await db_1.default.contactMessage.delete({
            where: { id },
        });
        return res.status(200).json({
            success: true,
            message: 'Contact message deleted successfully.',
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
}
// ----------------------------------------------------
// Consultations Handlers
// ----------------------------------------------------
async function getConsultations(req, res, next) {
    try {
        const { status, search } = req.query;
        const whereClause = {};
        if (status) {
            whereClause.status = String(status);
        }
        if (search) {
            const searchStr = String(search);
            whereClause.OR = [
                { name: { contains: searchStr, mode: 'insensitive' } },
                { email: { contains: searchStr, mode: 'insensitive' } },
                { phone: { contains: searchStr, mode: 'insensitive' } },
                { matterType: { contains: searchStr, mode: 'insensitive' } },
                { message: { contains: searchStr, mode: 'insensitive' } },
            ];
        }
        const consultations = await db_1.default.consultationRequest.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
        });
        return res.status(200).json({
            success: true,
            message: 'Consultations retrieved successfully.',
            data: consultations,
        });
    }
    catch (error) {
        next(error);
    }
}
async function getConsultationById(req, res, next) {
    try {
        const { id } = req.params;
        const consultation = await db_1.default.consultationRequest.findUnique({
            where: { id },
        });
        if (!consultation) {
            return res.status(404).json({
                success: false,
                message: 'Consultation request not found.',
                errors: [],
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Consultation request retrieved successfully.',
            data: consultation,
        });
    }
    catch (error) {
        next(error);
    }
}
async function updateConsultationStatus(req, res, next) {
    try {
        const { id } = req.params;
        const parseResult = validators_1.statusUpdateSchema.safeParse(req.body);
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
        const { status } = parseResult.data;
        const consultation = await db_1.default.consultationRequest.findUnique({
            where: { id },
        });
        if (!consultation) {
            return res.status(404).json({
                success: false,
                message: 'Consultation request not found.',
                errors: [],
            });
        }
        const updated = await db_1.default.consultationRequest.update({
            where: { id },
            data: { status },
        });
        return res.status(200).json({
            success: true,
            message: `Consultation status updated to ${status}.`,
            data: updated,
        });
    }
    catch (error) {
        next(error);
    }
}
async function deleteConsultation(req, res, next) {
    try {
        const { id } = req.params;
        const consultation = await db_1.default.consultationRequest.findUnique({
            where: { id },
        });
        if (!consultation) {
            return res.status(404).json({
                success: false,
                message: 'Consultation request not found.',
                errors: [],
            });
        }
        await db_1.default.consultationRequest.delete({
            where: { id },
        });
        return res.status(200).json({
            success: true,
            message: 'Consultation request deleted successfully.',
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
}
