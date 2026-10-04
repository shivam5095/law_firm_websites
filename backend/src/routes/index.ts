import { Router } from 'express';
import { createConsultation } from '../controllers/submission.controller';
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
import lawyersRouter from './lawyers.routes';

const router = Router();

// Careers
router.use('/', careersRouter);

// Lawyers
router.use('/', lawyersRouter);

// Health Check
router.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(200).json({
      status: 'ok',
      database: 'up',
    });
  } catch (error) {
    console.error('Database health check failed:', error);

    return res.status(503).json({
      status: 'error',
      database: 'down',
    });
  }
});

// Public submissions
router.post('/consultations', strictLimiter, createConsultation);

// Login
router.post('/auth/login', strictLimiter, login);

// Admin authentication
router.use('/admin', authMiddleware, adminMiddleware);

router.get('/admin/contacts', getContacts);
router.get('/admin/contacts/:id', getContactById);
router.patch('/admin/contacts/:id/status', updateContactStatus);
router.delete('/admin/contacts/:id', deleteContact);

router.get('/admin/consultations', getConsultations);
router.get('/admin/consultations/:id', getConsultationById);
router.patch('/admin/consultations/:id/status', updateConsultationStatus);
router.delete('/admin/consultations/:id', deleteConsultation);

export default router;
