import { z } from 'zod';

export const internshipApplicationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters long'),
  city: z.string().min(2, 'City must be at least 2 characters long'),
  state: z.string().min(2, 'State must be at least 2 characters long'),
  dateOfBirth: z.string().optional().nullable().transform((val) => val ? new Date(val) : null),
  lawSchool: z.string().min(2, 'Law School/University name is required'),
  course: z.string().min(2, 'Current course description is required'),
  currentYear: z.string().min(1, 'Current year/semester is required'),
  graduationYear: z.preprocess((val) => (val ? parseInt(val as string, 10) : null), z.number().nullable().optional()),
  cgpa: z.string().optional().nullable(),
  areasOfInterest: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        try {
          return JSON.parse(val);
        } catch (_) {
          return val.split(',').map((s) => s.trim());
        }
      }
      return val;
    },
    z.array(z.string()).min(1, 'At least one area of interest is required')
  ),
  internshipMode: z.string().min(2, 'Internship mode is required'),
  duration: z.string().min(2, 'Duration is required'),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid start date format',
  }).transform((val) => new Date(val)),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid end date format',
  }).transform((val) => new Date(val)),
  previousExperience: z.string().optional().nullable(),
  skills: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        try {
          return JSON.parse(val);
        } catch (_) {
          return val.split(',').map((s) => s.trim());
        }
      }
      return val;
    },
    z.array(z.string())
  ),
  motivation: z.string().min(10, 'Why do you want to intern must be at least 10 characters'),
  additionalInformation: z.string().optional().nullable(),
  honeypot: z.string().optional(), // Honeypot field
});

export const careersStatusUpdateSchema = z.object({
  status: z.enum([
    'SUBMITTED',
    'UNDER_REVIEW',
    'SHORTLISTED',
    'INTERVIEW',
    'ACCEPTED',
    'REJECTED',
    'WITHDRAWN',
  ], {
    errorMap: () => ({ message: 'Invalid application status value' }),
  }),
});
