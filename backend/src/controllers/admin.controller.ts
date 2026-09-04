import { Response, NextFunction } from 'express';
import prisma from '../config/db';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { statusUpdateSchema } from '../validators';

// ----------------------------------------------------
// Contacts Handlers
// ----------------------------------------------------

export async function getContacts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { status, search } = req.query;

    const whereClause: any = {};

    if (status) {
      whereClause.status = String(status);
    }

    if (search) {
      const searchStr = String(search);
      whereClause.OR = [
        { name: { contains: searchStr, mode: 'insensitive' } },
        { email: { contains: searchStr, mode: 'insensitive' } },
        { subject: { contains: searchStr, mode: 'insensitive' } },
        { message: { contains: searchStr, mode: 'insensitive' } },
      ];
    }

    const contacts = await prisma.contactMessage.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      message: 'Contacts retrieved successfully.',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
}

export async function getContactById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const contact = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found.',
        errors: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact message retrieved successfully.',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateContactStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const parseResult = statusUpdateSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }

    const { status } = parseResult.data;

    const contact = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found.',
        errors: [],
      });
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({
      success: true,
      message: `Contact message status updated to ${status}.`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteContact(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const contact = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found.',
        errors: [],
      });
    }

    await prisma.contactMessage.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
}

// ----------------------------------------------------
// Consultations Handlers
// ----------------------------------------------------

export async function getConsultations(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { status, search } = req.query;

    const whereClause: any = {};

    if (status) {
      whereClause.status = String(status);
    }

    if (search) {
      const searchStr = String(search);
      whereClause.OR = [
        { name: { contains: searchStr, mode: 'insensitive' } },
        { email: { contains: searchStr, mode: 'insensitive' } },
        { phone: { contains: searchStr, mode: 'insensitive' } },
        { matterType: { contains: searchStr, mode: 'insensitive' } },
        { message: { contains: searchStr, mode: 'insensitive' } },
      ];
    }

    const consultations = await prisma.consultationRequest.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      message: 'Consultations retrieved successfully.',
      data: consultations,
    });
  } catch (error) {
    next(error);
  }
}

export async function getConsultationById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const consultation = await prisma.consultationRequest.findUnique({
      where: { id },
    });

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation request not found.',
        errors: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Consultation request retrieved successfully.',
      data: consultation,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateConsultationStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const parseResult = statusUpdateSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }

    const { status } = parseResult.data;

    const consultation = await prisma.consultationRequest.findUnique({
      where: { id },
    });

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation request not found.',
        errors: [],
      });
    }

    const updated = await prisma.consultationRequest.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({
      success: true,
      message: `Consultation status updated to ${status}.`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteConsultation(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const consultation = await prisma.consultationRequest.findUnique({
      where: { id },
    });

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation request not found.',
        errors: [],
      });
    }

    await prisma.consultationRequest.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: 'Consultation request deleted successfully.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
}
