import express from 'express';
import { calculateRoute } from '../controllers/routeController.js';

const router = express.Router();

router.post('/navigate', calculateRoute);

export default router;
