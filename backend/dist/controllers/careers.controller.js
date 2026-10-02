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
exports.uploadResume = uploadResume;
exports.applyForInternship = applyForInternship;
const multer_1 = __importDefault(require("multer"));
const path = __importStar(require("path"));
const careers_validator_1 = require("../validators/careers.validator");
const careersEmail_service_1 = require("../services/careersEmail.service");
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: careers_validator_1.MAX_RESUME_SIZE_BYTES, files: 1 },
    fileFilter: (_req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        if (['.pdf', '.doc', '.docx'].includes(extension)) {
            callback(null, true);
            return;
        }
        callback(new Error('Resume must be a PDF or DOC file.'));
    },
});
const uploadSingleResume = upload.single('resume');
function uploadResume(req, res, next) {
    uploadSingleResume(req, res, (error) => {
        if (error) {
            const message = error instanceof multer_1.default.MulterError && error.code === 'LIMIT_FILE_SIZE'
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
async function applyForInternship(req, res, next) {
    if (typeof req.body.honeypot === 'string' && req.body.honeypot.trim()) {
        return res.status(200).json({ success: true, message: 'Application submitted.' });
    }
    const parsed = careers_validator_1.careerApplicationSchema.safeParse({
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
    const resumeSize = careers_validator_1.resumeSizeSchema.safeParse(req.file.size);
    if (!resumeSize.success) {
        return res.status(400).json({
            success: false,
            message: resumeSize.error.errors[0].message,
            errors: [{ field: 'resume', message: resumeSize.error.errors[0].message }],
        });
    }
    try {
        await (0, careersEmail_service_1.sendCareerApplicationNotification)({
            ...parsed.data,
            resume: {
                filename: path.basename(req.file.originalname),
                content: req.file.buffer.toString('base64'),
            },
        });
        return res.status(201).json({ success: true, message: 'Application submitted successfully.' });
    }
    catch (error) {
        return next(error);
    }
}
