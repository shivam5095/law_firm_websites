import { Router } from 'express';
import {
  applyForInternship,
  uploadFields,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  downloadResume,
  downloadCoverLetter,
  downloadWritingSample,
} from '../controllers/careers.controller';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';
import { strictLimiter } from '../middleware/rateLimitMiddleware';

const router = Router();

// Public: Apply for internship (Rate-limited, multipart/form-data upload)
router.post('/careers/apply', strictLimiter, uploadFields, applyForInternship);

// Admin: Manage applications (Authenticated & Authorized)
router.get('/admin/careers', authMiddleware, adminMiddleware, getApplications);
router.get('/admin/careers/:id', authMiddleware, adminMiddleware, getApplicationById);
router.patch('/admin/careers/:id/status', authMiddleware, adminMiddleware, updateApplicationStatus);
router.delete('/admin/careers/:id', authMiddleware, adminMiddleware, deleteApplication);

// Admin: Secure Document Downloads (Authenticated & Authorized)
router.get('/admin/careers/:id/resume', authMiddleware, adminMiddleware, downloadResume);
router.get('/admin/careers/:id/cover-letter', authMiddleware, adminMiddleware, downloadCoverLetter);
router.get('/admin/careers/:id/writing-sample', authMiddleware, adminMiddleware, downloadWritingSample);

export default router;
