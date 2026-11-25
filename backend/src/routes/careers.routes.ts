import { Router } from 'express';
import { applyForCareer, uploadResume } from '../controllers/careers.controller';
import { strictLimiter } from '../middleware/rateLimitMiddleware';

const router = Router();

router.post('/careers/apply', strictLimiter, uploadResume, applyForCareer);

export default router;
