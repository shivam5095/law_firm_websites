import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import * as path from 'path';
import { careerApplicationSchema, MAX_RESUME_SIZE_BYTES, resumeSizeSchema } from '../validators/careers.validator';
import { sendCareerApplicationNotification } from '../services/email.service';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_RESUME_SIZE_BYTES, files: 1 },
    fileFilter: (_req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        if (['.pdf', '.doc', '.docx'].includes(extension)) {
            callback(null, true);
            return;
        }
        callback(new Error('Resume must be a PDF, DOC, or DOCX file.'));
    },
});

const uploadSingleResume = upload.single('resume');

export function uploadResume(req: Request, res: Response, next: NextFunction) {
    uploadSingleResume(req, res, (error) => {
        if (error) {
            const message = error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE'
                ? 'Resume must be 4 MB or smaller.'
                : error.message;
            return res.status(400).json({
                success: false,
                message,
                errors: [{ field: 'resume', message }],
            });
        }
        return next();
    });
}

export async function applyForInternship(req: Request, res: Response, next: NextFunction) {
    if (typeof req.body.honeypot === 'string' && req.body.honeypot.trim()) {
        return res.status(200).json({ success: true, message: 'Application submitted.' });
    }

    const parsed = careerApplicationSchema.safeParse({
        ...req.body,
        consent: req.body.consent === 'true',
    });
    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            message: 'Please correct the application details.',
            errors: parsed.error.errors.map((error) => ({
                field: error.path.join('.'),
                message: error.message,
            })),
        });
    }

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'Resume upload is required.',
            errors: [{ field: 'resume', message: 'Please attach a PDF or DOC resume up to 4 MB.' }],
        });
    }

    const resumeSize = resumeSizeSchema.safeParse(req.file.size);
    if (!resumeSize.success) {
        return res.status(400).json({
            success: false,
            message: resumeSize.error.errors[0].message,
            errors: [{ field: 'resume', message: resumeSize.error.errors[0].message }],
        });
    }

    try {
        const emailSent = await sendCareerApplicationNotification({
            ...parsed.data,
            resume: {
                filename: req.file.originalname,
                content: req.file.buffer,
            },
        });
        if (!emailSent) {
            return res.status(503).json({
                success: false,
                message: 'We could not submit your application right now. Please try again later.',
            });
        }
        return res.status(201).json({ success: true, message: 'Application submitted successfully.' });
    } catch (error) {
        return next(error);
    }
}