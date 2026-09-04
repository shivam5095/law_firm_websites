"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFields = void 0;
exports.applyForInternship = applyForInternship;
exports.getApplications = getApplications;
exports.getApplicationById = getApplicationById;
exports.updateApplicationStatus = updateApplicationStatus;
exports.deleteApplication = deleteApplication;
exports.downloadResume = downloadResume;
exports.downloadCoverLetter = downloadCoverLetter;
exports.downloadWritingSample = downloadWritingSample;
const multer_1 = __importDefault(require("multer"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const db_1 = __importDefault(require("../config/db"));
const careers_validator_1 = require("../validators/careers.validator");
const careers_service_1 = require("../services/careers.service");
const careersEmail_service_1 = require("../services/careersEmail.service");
// Multer Storage Configuration
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, careers_service_1.STORAGE_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});
// Multer Filter: PDF, DOC, DOCX
const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
        cb(null, true);
    }
    else {
        cb(new Error('Only PDF, DOC, and DOCX documents are allowed.'));
    }
};
exports.uploadFields = (0, multer_1.default)({
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
async function applyForInternship(req, res, next) {
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
        const files = req.files;
        const resumeFile = files?.['resume']?.[0];
        if (!resumeFile) {
            return res.status(400).json({
                success: false,
                message: 'Resume upload is required.',
                errors: [{ field: 'resume', message: 'Please upload your CV/Resume (PDF, DOC, DOCX)' }],
            });
        }
        // 3. Request fields validation
        const parseResult = careers_validator_1.internshipApplicationSchema.safeParse(req.body);
        if (!parseResult.success) {
            // Clean up uploaded files if validation fails
            if (files) {
                Object.keys(files).forEach((key) => {
                    files[key].forEach((f) => (0, careers_service_1.deleteFile)(f.filename));
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
        const application = await db_1.default.internshipApplication.create({
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
        (0, careersEmail_service_1.sendRecruitmentNotification)({
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
        (0, careersEmail_service_1.sendApplicantConfirmation)({
            fullName: application.fullName,
            email: application.email,
        }).catch((err) => console.error('[Careers Email] Applicant confirmation failure:', err));
        return res.status(201).json({
            success: true,
            message: 'Application Submitted successfully.',
            data: { id: application.id },
        });
    }
    catch (error) {
        next(error);
    }
}
// ----------------------------------------------------
// Authenticated Admin Controllers
// ----------------------------------------------------
async function getApplications(req, res, next) {
    try {
        const { status, search } = req.query;
        const whereClause = {};
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
        const applications = await db_1.default.internshipApplication.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
        });
        return res.status(200).json({
            success: true,
            message: 'Applications retrieved successfully.',
            data: applications,
        });
    }
    catch (error) {
        next(error);
    }
}
async function getApplicationById(req, res, next) {
    try {
        const { id } = req.params;
        const application = await db_1.default.internshipApplication.findUnique({
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
    }
    catch (error) {
        next(error);
    }
}
async function updateApplicationStatus(req, res, next) {
    try {
        const { id } = req.params;
        const parseResult = careers_validator_1.careersStatusUpdateSchema.safeParse(req.body);
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
        const application = await db_1.default.internshipApplication.findUnique({
            where: { id },
        });
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Internship application not found.',
                errors: [],
            });
        }
        const updated = await db_1.default.internshipApplication.update({
            where: { id },
            data: { status },
        });
        return res.status(200).json({
            success: true,
            message: `Application status updated to ${status}.`,
            data: updated,
        });
    }
    catch (error) {
        next(error);
    }
}
async function deleteApplication(req, res, next) {
    try {
        const { id } = req.params;
        const application = await db_1.default.internshipApplication.findUnique({
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
        (0, careers_service_1.deleteFile)(application.resumePath);
        if (application.coverLetterPath)
            (0, careers_service_1.deleteFile)(application.coverLetterPath);
        if (application.writingSamplePath)
            (0, careers_service_1.deleteFile)(application.writingSamplePath);
        // Delete DB record
        await db_1.default.internshipApplication.delete({
            where: { id },
        });
        return res.status(200).json({
            success: true,
            message: 'Application record and documents deleted successfully.',
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
}
// ----------------------------------------------------
// Secure Document Downloads
// ----------------------------------------------------
async function downloadResume(req, res, next) {
    try {
        const { id } = req.params;
        const application = await db_1.default.internshipApplication.findUnique({
            where: { id },
        });
        if (!application || !application.resumePath) {
            return res.status(404).json({
                success: false,
                message: 'Document not found.',
                errors: [],
            });
        }
        const filePath = (0, careers_service_1.getAbsoluteFilePath)(application.resumePath);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: 'Physical document file missing on server.',
                errors: [],
            });
        }
        return res.download(filePath, application.resumeOriginalName);
    }
    catch (error) {
        next(error);
    }
}
async function downloadCoverLetter(req, res, next) {
    try {
        const { id } = req.params;
        const application = await db_1.default.internshipApplication.findUnique({
            where: { id },
        });
        if (!application || !application.coverLetterPath) {
            return res.status(404).json({
                success: false,
                message: 'Document not found.',
                errors: [],
            });
        }
        const filePath = (0, careers_service_1.getAbsoluteFilePath)(application.coverLetterPath);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: 'Physical cover letter file missing on server.',
                errors: [],
            });
        }
        const downloadName = `${application.fullName.replace(/\s+/g, '_')}_Cover_Letter${path.extname(application.coverLetterPath)}`;
        return res.download(filePath, downloadName);
    }
    catch (error) {
        next(error);
    }
}
async function downloadWritingSample(req, res, next) {
    try {
        const { id } = req.params;
        const application = await db_1.default.internshipApplication.findUnique({
            where: { id },
        });
        if (!application || !application.writingSamplePath) {
            return res.status(404).json({
                success: false,
                message: 'Document not found.',
                errors: [],
            });
        }
        const filePath = (0, careers_service_1.getAbsoluteFilePath)(application.writingSamplePath);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: 'Physical writing sample file missing on server.',
                errors: [],
            });
        }
        const downloadName = `${application.fullName.replace(/\s+/g, '_')}_Writing_Sample${path.extname(application.writingSamplePath)}`;
        return res.download(filePath, downloadName);
    }
    catch (error) {
        next(error);
    }
}
