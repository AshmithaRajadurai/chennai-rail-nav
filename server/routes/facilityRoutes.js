import express from 'express';
import { toggleEdgeStatus } from '../controllers/facilityController.js';

const router = express.Router();

router.patch('/toggle-edge', toggleEdgeStatus);

export default router;
