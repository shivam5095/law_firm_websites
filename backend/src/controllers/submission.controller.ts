import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { contactSchema, consultationSchema } from '../validators';
import { sendContactNotification, sendConsultationNotification } from '../services/email.service';

export async function createContact(req: Request, res: Response, next: NextFunction) {
  try {
    const parseResult = contactSchema.safeParse(req.body);
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

    const { name, email, phone, subject, message } = parseResult.data;

    const contact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        status: 'NEW',
      },
    });

    // Send email notification (asynchronous)
    sendContactNotification({ name, email, phone, subject, message }).catch(console.error);

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully. We will contact you soon.',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
}

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

    // Send email notification (asynchronous)
    sendConsultationNotification({
      name,
      email,
      phone,
      matterType,
      preferredMode,
      preferredDate: new Date(preferredDate),
      message,
    }).catch(console.error);

    return res.status(201).json({
      success: true,
      message: 'Consultation request submitted successfully.',
      data: request,
    });
  } catch (error) {
    next(error);
  }
}
