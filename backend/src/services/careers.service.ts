import * as path from 'path';
import * as fs from 'fs';

export const STORAGE_DIR = path.resolve(__dirname, '../../storage/resumes');

// Verify and ensure storage directory exists
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

export function getAbsoluteFilePath(fileName: string): string {
  // Prevent directory traversal by extracting the base name
  const safeName = path.basename(fileName);
  return path.join(STORAGE_DIR, safeName);
}

export function deleteFile(fileName: string) {
  try {
    const fullPath = getAbsoluteFilePath(fileName);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.error(`[Careers Service] Failed to delete file ${fileName}:`, error);
  }
}
