import { z } from 'zod';

export const consultationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits/characters long'),
  email: z.string().email('Invalid email address'),
  matterType: z.string().min(2, 'Please select the nature of your matter'),
  preferredMode: z.enum(['Office', 'Phone', 'Video']),
  preferredDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid preferred date format',
  }),
  message: z.string().optional().nullable(),
  consent: z.boolean().refine(val => val === true, {
    message: 'You must consent to proceed'
  }),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().nullable(),
  subject: z.string().min(3, 'Subject must be at least 3 characters long'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
