import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import stationRoutes from './routes/stationRoutes.js';
import routeRoutes from './routes/routeRoutes.js';
import facilityRoutes from './routes/facilityRoutes.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/stations', stationRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/facilities', facilityRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
