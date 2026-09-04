import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import prisma from '../config/db';
import { internshipApplicationSchema, careersStatusUpdateSchema } from '../validators/careers.validator';
import { STORAGE_DIR, getAbsoluteFilePath, deleteFile } from '../services/careers.service';
import { sendRecruitmentNotification, sendApplicantConfirmation } from '../services/careersEmail.service';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// Multer Storage Configuration
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STORAGE_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Multer Filter: PDF, DOC, DOCX
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX documents are allowed.'));
  }
};

export const uploadFields = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
}).fields([
  { name: 'resume', maxCount: 1 },
  { name: 'coverLetter', maxCount: 1 },
  { name: 'writingSample', maxCount: 1 },
]);

// ----------------------------------------------------
// Public Application Controller
// ----------------------------------------------------
export async function applyForInternship(req: Request, res: Response, next: NextFunction) {
  try {
    // 1. Honeypot check
    if (req.body.honeypot && req.body.honeypot.trim() !== '') {
      console.log('[Careers Controller] Honeypot field filled. Rejecting silently to deter spambot.');
      return res.status(200).json({
        success: true,
        message: 'Application Submitted successfully.',
        data: { id: 'honeypot-ref' },
      });
    }

    // 2. File fields check
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const resumeFile = files?.['resume']?.[0];
    
    if (!resumeFile) {
      return res.status(400).json({
        success: false,
        message: 'Resume upload is required.',
        errors: [{ field: 'resume', message: 'Please upload your CV/Resume (PDF, DOC, DOCX)' }],
      });
    }

    // 3. Request fields validation
    const parseResult = internshipApplicationSchema.safeParse(req.body);
    if (!parseResult.success) {
      // Clean up uploaded files if validation fails
      if (files) {
        Object.keys(files).forEach((key) => {
          files[key].forEach((f) => deleteFile(f.filename));
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }

    const valData = parseResult.data;

    // 4. Save to Database
    const application = await prisma.internshipApplication.create({
      data: {
        fullName: valData.fullName,
        email: valData.email,
        phone: valData.phone,
        city: valData.city,
        state: valData.state,
        dateOfBirth: valData.dateOfBirth,
        lawSchool: valData.lawSchool,
        course: valData.course,
        currentYear: valData.currentYear,
        graduationYear: valData.graduationYear,
        cgpa: valData.cgpa,
        areasOfInterest: valData.areasOfInterest,
        internshipMode: valData.internshipMode,
        duration: valData.duration,
        startDate: valData.startDate,
        endDate: valData.endDate,
        previousExperience: valData.previousExperience,
        skills: valData.skills,
        motivation: valData.motivation,
        additionalInformation: valData.additionalInformation,
        
        // Files information
        resumePath: resumeFile.filename,
        resumeOriginalName: resumeFile.originalname,
        coverLetterPath: files?.['coverLetter']?.[0]?.filename || null,
        writingSamplePath: files?.['writingSample']?.[0]?.filename || null,
        status: 'SUBMITTED',
      },
    });

    // 5. Send Alert Emails (Async, do not crash on error)
    sendRecruitmentNotification({
      id: application.id,
      fullName: application.fullName,
      email: application.email,
      phone: application.phone,
      lawSchool: application.lawSchool,
      course: application.course,
      currentYear: application.currentYear,
      areasOfInterest: application.areasOfInterest,
      duration: application.duration,
      startDate: application.startDate,
    }).catch((err) => console.error('[Careers Email] Alert send failure:', err));

    sendApplicantConfirmation({
      fullName: application.fullName,
      email: application.email,
    }).catch((err) => console.error('[Careers Email] Applicant confirmation failure:', err));

    return res.status(201).json({
      success: true,
      message: 'Application Submitted successfully.',
      data: { id: application.id },
    });
  } catch (error) {
    next(error);
  }
}

// ----------------------------------------------------
// Authenticated Admin Controllers
// ----------------------------------------------------

export async function getApplications(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { status, search } = req.query;
    const whereClause: any = {};

    if (status) {
      whereClause.status = String(status);
    }

    if (search) {
      const searchStr = String(search);
      whereClause.OR = [
        { fullName: { contains: searchStr, mode: 'insensitive' } },
        { email: { contains: searchStr, mode: 'insensitive' } },
        { lawSchool: { contains: searchStr, mode: 'insensitive' } },
        { course: { contains: searchStr, mode: 'insensitive' } },
      ];
    }

    const applications = await prisma.internshipApplication.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      message: 'Applications retrieved successfully.',
      data: applications,
    });
  } catch (error) {
    next(error);
  }
}

export async function getApplicationById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const application = await prisma.internshipApplication.findUnique({
      where: { id },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Internship application not found.',
        errors: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Application details retrieved.',
      data: application,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateApplicationStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const parseResult = careersStatusUpdateSchema.safeParse(req.body);
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

    const application = await prisma.internshipApplication.findUnique({
      where: { id },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Internship application not found.',
        errors: [],
      });
    }

    const updated = await prisma.internshipApplication.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({
      success: true,
      message: `Application status updated to ${status}.`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteApplication(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const application = await prisma.internshipApplication.findUnique({
      where: { id },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Internship application not found.',
        errors: [],
      });
    }

    // Delete stored files
    deleteFile(application.resumePath);
    if (application.coverLetterPath) deleteFile(application.coverLetterPath);
    if (application.writingSamplePath) deleteFile(application.writingSamplePath);

    // Delete DB record
    await prisma.internshipApplication.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: 'Application record and documents deleted successfully.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
}

// ----------------------------------------------------
// Secure Document Downloads
// ----------------------------------------------------

export async function downloadResume(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const application = await prisma.internshipApplication.findUnique({
      where: { id },
    });

    if (!application || !application.resumePath) {
      return res.status(404).json({
        success: false,
        message: 'Document not found.',
        errors: [],
      });
    }

    const filePath = getAbsoluteFilePath(application.resumePath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Physical document file missing on server.',
        errors: [],
      });
    }

    return res.download(filePath, application.resumeOriginalName);
  } catch (error) {
    next(error);
  }
}

export async function downloadCoverLetter(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const application = await prisma.internshipApplication.findUnique({
      where: { id },
    });

    if (!application || !application.coverLetterPath) {
      return res.status(404).json({
        success: false,
        message: 'Document not found.',
        errors: [],
      });
    }

    const filePath = getAbsoluteFilePath(application.coverLetterPath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Physical cover letter file missing on server.',
        errors: [],
      });
    }

    const downloadName = `${application.fullName.replace(/\s+/g, '_')}_Cover_Letter${path.extname(application.coverLetterPath)}`;
    return res.download(filePath, downloadName);
  } catch (error) {
    next(error);
  }
}

export async function downloadWritingSample(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const application = await prisma.internshipApplication.findUnique({
      where: { id },
    });

    if (!application || !application.writingSamplePath) {
      return res.status(404).json({
        success: false,
        message: 'Document not found.',
        errors: [],
      });
    }

    const filePath = getAbsoluteFilePath(application.writingSamplePath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Physical writing sample file missing on server.',
        errors: [],
      });
    }

    const downloadName = `${application.fullName.replace(/\s+/g, '_')}_Writing_Sample${path.extname(application.writingSamplePath)}`;
    return res.download(filePath, downloadName);
  } catch (error) {
    next(error);
  }
}
