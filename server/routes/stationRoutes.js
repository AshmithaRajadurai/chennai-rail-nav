import express from 'express';
import { getStations, getStationDetails } from '../controllers/stationController.js';

const router = express.Router();

router.get('/', getStations);
router.get('/:stationId', getStationDetails);

export default router;
