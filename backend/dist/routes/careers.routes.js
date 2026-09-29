"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const careers_controller_1 = require("../controllers/careers.controller");
const rateLimitMiddleware_1 = require("../middleware/rateLimitMiddleware");
const router = (0, express_1.Router)();
router.post('/careers/apply', rateLimitMiddleware_1.strictLimiter, careers_controller_1.uploadResume, careers_controller_1.applyForInternship);
exports.default = router;
