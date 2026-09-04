"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const submission_controller_1 = require("../controllers/submission.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const admin_controller_1 = require("../controllers/admin.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const rateLimitMiddleware_1 = require("../middleware/rateLimitMiddleware");
const careers_routes_1 = __importDefault(require("./careers.routes"));
const router = (0, express_1.Router)();
// Mount Careers Sub-module
router.use('/', careers_routes_1.default);
// Health Check
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running smoothly.',
        data: { uptime: process.uptime() },
    });
});
// Public Submission Routes (Rate Limited)
router.post('/contact', rateLimitMiddleware_1.strictLimiter, submission_controller_1.createContact);
router.post('/consultations', rateLimitMiddleware_1.strictLimiter, submission_controller_1.createConsultation);
// Authentication Route (Rate Limited)
router.post('/auth/login', rateLimitMiddleware_1.strictLimiter, auth_controller_1.login);
// Admin Routes (Authenticated & Authorized)
router.use('/admin', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware);
// Admin Contacts Management
router.get('/admin/contacts', admin_controller_1.getContacts);
router.get('/admin/contacts/:id', admin_controller_1.getContactById);
router.patch('/admin/contacts/:id/status', admin_controller_1.updateContactStatus);
router.delete('/admin/contacts/:id', admin_controller_1.deleteContact);
// Admin Consultations Management
router.get('/admin/consultations', admin_controller_1.getConsultations);
router.get('/admin/consultations/:id', admin_controller_1.getConsultationById);
router.patch('/admin/consultations/:id/status', admin_controller_1.updateConsultationStatus);
router.delete('/admin/consultations/:id', admin_controller_1.deleteConsultation);
exports.default = router;
