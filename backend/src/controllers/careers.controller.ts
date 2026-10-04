import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import * as path from 'path';
import { careerApplicationSchema, MAX_RESUME_SIZE_BYTES, resumeSizeSchema } from '../validators/careers.validator';
import { sendCareerApplicationNotification } from '../services/email.service';

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

function getExtension(originalName: string): { filename: string; extension: string } {
    const filename = originalName.replace(/\\/g, '/').split('/').pop() || '';
    return { filename, extension: path.extname(filename).toLowerCase() };
}

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_RESUME_SIZE_BYTES, files: 1, fields: 20, fieldSize: 10 * 1024 },
    fileFilter: (_req, file, callback) => {
        const { extension } = getExtension(file.originalname);
        if (ALLOWED_EXTENSIONS.includes(extension)) {
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
            const tooLarge = error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE';
            const message = tooLarge
                ? 'Resume must be 4 MB or smaller.'
                : error instanceof multer.MulterError && error.code === 'LIMIT_FIELD_VALUE'
                    ? 'Application fields must be 10 KB or smaller.'
                    : error.message;
            return res.status(tooLarge ? 413 : 400).json({
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
            errors: [{ field: 'resume', message: 'Please attach a PDF, DOC, or DOCX resume up to 4 MB.' }],
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
        const { filename, extension } = getExtension(req.file.originalname);
        if (!ALLOWED_EXTENSIONS.includes(extension) || !Buffer.isBuffer(req.file.buffer)) {
            return res.status(400).json({
                success: false,
                message: 'Please attach a PDF, DOC, or DOCX resume up to 4 MB.',
                code: 'INVALID_RESUME',
            });
        }

        const safeBaseName = path.basename(filename, path.extname(filename))
            .replace(/[^\p{L}\p{N}._-]+/gu, '_')
            .replace(/^\.+/, '')
            .slice(0, 120);
        const attachmentFilename = `${safeBaseName || 'resume'}${extension}`;

        const emailResult = await sendCareerApplicationNotification({
            name: parsed.data.fullName,
            email: parsed.data.email,
            phone: parsed.data.phone,
            practiceArea: parsed.data.practiceArea,
            message: parsed.data.message,
            resume: { filename: attachmentFilename, content: req.file.buffer },
        });

        if (!emailResult.success) {
            console.error(emailResult.reason); // shows the real Resend error in Vercel Logs
            return res.status(502).json({
                success: false,
                message: 'Application email could not be sent. Please try again later.',
                code: 'EMAIL_SEND_FAILED',
            });
        }
        return res.status(201).json({ success: true, message: 'Application submitted successfully.' });
    } catch (error) {
        return next(error);
    }
}