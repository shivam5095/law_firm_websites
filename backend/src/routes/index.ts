import { Router } from 'express';
import { createContact, createConsultation } from '../controllers/submission.controller';
import { login } from '../controllers/auth.controller';
import {
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getConsultations,
  getConsultationById,
  updateConsultationStatus,
  deleteConsultation,
} from '../controllers/admin.controller';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';
import { strictLimiter } from '../middleware/rateLimitMiddleware';
import prisma from '../config/db';
import careersRouter from './careers.routes';

const router = Router();

// Mount Careers Sub-module
router.use('/', careersRouter);

// Health Check
router.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({ status: 'ok', database: 'up' });
  } catch (error: unknown) {
    const errorDetails = error && typeof error === 'object'
      ? error as { name?: unknown; code?: unknown; message?: unknown }
      : {};
    const sanitize = (value: unknown) => {
      if (typeof value === 'string') return value.replace(/postgres(?:ql)?:\/\/\S+/gi, '[redacted]');
      if (typeof value === 'number' || typeof value === 'boolean' || value == null) return value;
      return '[non-primitive error field]';
    };
    console.error({
      name: sanitize(errorDetails.name),
      ...(errorDetails.code !== undefined ? { code: sanitize(errorDetails.code) } : {}),
      message: sanitize(errorDetails.message),
    });
    return res.status(503).json({ status: 'error', database: 'down' });
  }
});

// Public Submission Routes (Rate Limited)
router.post('/contact', strictLimiter, createContact);
router.post('/consultations', strictLimiter, createConsultation);

// Authentication Route (Rate Limited)
router.post('/auth/login', strictLimiter, login);

// Admin Routes (Authenticated & Authorized)
router.use('/admin', authMiddleware, adminMiddleware);

// Admin Contacts Management
router.get('/admin/contacts', getContacts);
router.get('/admin/contacts/:id', getContactById);
router.patch('/admin/contacts/:id/status', updateContactStatus);
router.delete('/admin/contacts/:id', deleteContact);

// Admin Consultations Management
router.get('/admin/consultations', getConsultations);
router.get('/admin/consultations/:id', getConsultationById);
router.patch('/admin/consultations/:id/status', updateConsultationStatus);
router.delete('/admin/consultations/:id', deleteConsultation);

export default router;
