import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

// Vercel's filesystem is read-only except /tmp — use it there,
// keep the local repo folder for local dev.
export const STORAGE_DIR = process.env.VERCEL
  ? path.join(os.tmpdir(), 'resumes')
  : path.resolve(__dirname, '../../storage/resumes');

// Verify and ensure storage directory exists
try {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
} catch (error) {
  console.error('[Careers Service] Failed to create storage directory:', error);
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