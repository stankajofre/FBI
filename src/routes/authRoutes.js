// src/routes/authRoutes.js
import express from 'express';
import { authenticateAgent, restrictedRoute } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', authenticateAgent);
router.get('/restricted', authMiddleware, restrictedRoute);

export default router;
