import { Router } from 'express';
import prisma from '../config/db';

const router = Router();

// GET all lawyers
router.get('/lawyers', async (_req, res) => {
  try {
    const lawyers = await prisma.lawyer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({
      success: true,
      data: lawyers,
    });
  } catch (error) {
    console.error('Error fetching lawyers:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch lawyers',
      errors: [],
    });
  }
});

// GET lawyer by ID
router.get('/lawyers/:id', async (req, res) => {
  try {
    const lawyer = await prisma.lawyer.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!lawyer) {
      return res.status(404).json({
        success: false,
        message: 'Lawyer not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: lawyer,
    });
  } catch (error) {
    console.error('Error fetching lawyer:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch lawyer',
    });
  }
});

export default router;