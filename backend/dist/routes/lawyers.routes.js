"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../config/db"));
const router = (0, express_1.Router)();
// GET all lawyers
router.get('/lawyers', async (_req, res) => {
    try {
        const lawyers = await db_1.default.lawyer.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return res.status(200).json({
            success: true,
            data: lawyers,
        });
    }
    catch (error) {
        console.error('Error fetching lawyers:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch lawyers',
            errors: [],
        });
    }
});
// GET lawyer by ID
router.get('/lawyers/:id', async (req, res) => {
    try {
        const lawyer = await db_1.default.lawyer.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!lawyer) {
            return res.status(404).json({
                success: false,
                message: 'Lawyer not found',
            });
        }
        return res.status(200).json({
            success: true,
            data: lawyer,
        });
    }
    catch (error) {
        console.error('Error fetching lawyer:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch lawyer',
        });
    }
});
exports.default = router;
