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
const db_1 = __importDefault(require("../config/db"));
const careers_routes_1 = __importDefault(require("./careers.routes"));
const lawyers_routes_1 = __importDefault(require("./lawyers.routes"));
const router = (0, express_1.Router)();
// Careers
router.use('/', careers_routes_1.default);
// Lawyers
router.use('/', lawyers_routes_1.default);
// Health Check
router.get('/health', async (_req, res) => {
    try {
        await db_1.default.$queryRaw `SELECT 1`;
        return res.status(200).json({
            status: 'ok',
            database: 'up',
        });
    }
    catch (error) {
        console.error('Database health check failed:', error);
        return res.status(503).json({
            status: 'error',
            database: 'down',
        });
    }
});
// Public submissions
router.post('/consultations', rateLimitMiddleware_1.strictLimiter, submission_controller_1.createConsultation);
// Login
router.post('/auth/login', rateLimitMiddleware_1.strictLimiter, auth_controller_1.login);
// Admin authentication
router.use('/admin', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware);
router.get('/admin/contacts', admin_controller_1.getContacts);
router.get('/admin/contacts/:id', admin_controller_1.getContactById);
router.patch('/admin/contacts/:id/status', admin_controller_1.updateContactStatus);
router.delete('/admin/contacts/:id', admin_controller_1.deleteContact);
router.get('/admin/consultations', admin_controller_1.getConsultations);
router.get('/admin/consultations/:id', admin_controller_1.getConsultationById);
router.patch('/admin/consultations/:id/status', admin_controller_1.updateConsultationStatus);
router.delete('/admin/consultations/:id', admin_controller_1.deleteConsultation);
exports.default = router;
