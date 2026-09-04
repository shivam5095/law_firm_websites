import rateLimit from 'express-rate-limit';

// Standard rate limit for all endpoints: max 100 requests per 15 mins
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    errors: [],
  },
});

// Strict rate limit for submissions and logins: max 5 requests per 15 mins
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many submissions. Please wait 15 minutes before trying again.',
    errors: [],
  },
});
