"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const careers_controller_1 = require("../controllers/careers.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const rateLimitMiddleware_1 = require("../middleware/rateLimitMiddleware");
const router = (0, express_1.Router)();
// Public: Apply for internship (Rate-limited, multipart/form-data upload)
router.post('/careers/apply', rateLimitMiddleware_1.strictLimiter, careers_controller_1.uploadFields, careers_controller_1.applyForInternship);
// Admin: Manage applications (Authenticated & Authorized)
router.get('/admin/careers', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, careers_controller_1.getApplications);
router.get('/admin/careers/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, careers_controller_1.getApplicationById);
router.patch('/admin/careers/:id/status', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, careers_controller_1.updateApplicationStatus);
router.delete('/admin/careers/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, careers_controller_1.deleteApplication);
// Admin: Secure Document Downloads (Authenticated & Authorized)
router.get('/admin/careers/:id/resume', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, careers_controller_1.downloadResume);
router.get('/admin/careers/:id/cover-letter', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, careers_controller_1.downloadCoverLetter);
router.get('/admin/careers/:id/writing-sample', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, careers_controller_1.downloadWritingSample);
exports.default = router;
