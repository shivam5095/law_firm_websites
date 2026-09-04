"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
function errorMiddleware(err, req, res, next) {
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
