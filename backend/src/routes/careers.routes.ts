import { Router } from 'express';
import { applyForInternship, uploadResume } from '../controllers/careers.controller';
import { strictLimiter } from '../middleware/rateLimitMiddleware';

const router = Router();

router.post('/careers/apply', strictLimiter, uploadResume, applyForInternship);

export default router;