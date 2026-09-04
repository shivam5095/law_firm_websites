import { z } from 'zod';

export const consultationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  matterType: z.enum([
    'Banking & Finance',
    'Debt Restructuring',
    'Arbitration & Dispute Resolution',
    'Project & Infrastructure Disputes',
    'Commercial Disputes',
    'Insolvency & Financial Distress',
    'Other'
  ]),
  preferredMode: z.enum(['Office', 'Phone', 'Video']),
  preferredDate: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  consent: z.boolean().refine(val => val === true, {
    message: 'You must consent to proceed'
  }),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
