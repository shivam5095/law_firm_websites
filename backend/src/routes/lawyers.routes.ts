import { Router } from 'express';

const router = Router();

router.get('/lawyers', (_req, res) => {
    res.json({
        success: true,
        message: 'Lawyers API is working',
    });
});

export default router;