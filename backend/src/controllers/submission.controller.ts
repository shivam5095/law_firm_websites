import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { consultationSchema } from '../validators';
import { sendConsultationNotification } from '../services/email.service';

export async function createConsultation(req: Request, res: Response, next: NextFunction) {
  try {
    const parseResult = consultationSchema.safeParse(req.body);
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

    const { name, email, phone, matterType, preferredMode, preferredDate, message } = parseResult.data;

    const request = await prisma.consultationRequest.create({
      data: {
        name,
        email,
        phone,
        matterType,
        preferredMode,
        preferredDate: new Date(preferredDate),
        message,
        status: 'NEW',
      },
    });

    const emailResult = await sendConsultationNotification({
      name,
      email,
      phone,
      matterType,
      preferredMode,
      preferredDate: new Date(preferredDate),
      message: message ?? '',
    });

    return res.status(201).json({
      success: true,
      message: emailResult.success
        ? 'Consultation request submitted successfully.'
        : 'Your consultation request was received, but our team could not be notified automatically.',
      data: request,
    });
  } catch (error) {
    next(error);
  }
}