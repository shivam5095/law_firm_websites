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
