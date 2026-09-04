import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().nullable(),
  subject: z.string().min(3, 'Subject must be at least 3 characters long'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

export const consultationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits/characters long'),
  matterType: z.string().min(2, 'Please select the nature of your matter'),
  preferredMode: z.enum(['Office', 'Phone', 'Video'], {
    errorMap: () => ({ message: 'Preferred mode must be Office, Phone, or Video' }),
  }),
  preferredDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid preferred date format',
  }),
  message: z.string().optional().nullable(),
});

export const statusUpdateSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'IN_PROGRESS', 'CLOSED'], {
    errorMap: () => ({ message: 'Status must be NEW, CONTACTED, IN_PROGRESS, or CLOSED' }),
  }),
});
