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
Object.defineProperty(exports, "__esModule", { value: true });
exports.STORAGE_DIR = void 0;
exports.getAbsoluteFilePath = getAbsoluteFilePath;
exports.deleteFile = deleteFile;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
exports.STORAGE_DIR = path.resolve(__dirname, '../../storage/resumes');
// Verify and ensure storage directory exists
if (!fs.existsSync(exports.STORAGE_DIR)) {
    fs.mkdirSync(exports.STORAGE_DIR, { recursive: true });
}
function getAbsoluteFilePath(fileName) {
    // Prevent directory traversal by extracting the base name
    const safeName = path.basename(fileName);
    return path.join(exports.STORAGE_DIR, safeName);
}
function deleteFile(fileName) {
    try {
        const fullPath = getAbsoluteFilePath(fileName);
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }
    }
    catch (error) {
        console.error(`[Careers Service] Failed to delete file ${fileName}:`, error);
    }
}
