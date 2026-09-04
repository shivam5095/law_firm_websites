import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
  status?: number;
  errors?: any[];
}

export function errorMiddleware(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong.';
  const errors = err.errors || [];

  // Log only in dev or logs
  if (process.env.NODE_ENV === 'development' || status === 500) {
    console.error(`[Error] ${status} - ${message}`, err.stack);
  }

  res.status(status).json({
    success: false,
    message: status === 500 ? 'Internal server error.' : message,
    errors: errors,
  });
}
