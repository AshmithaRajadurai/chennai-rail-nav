import Station from '../models/Station.js';
import Node from '../models/Node.js';
import Edge from '../models/Edge.js';

// @desc    Get all stations
// @route   GET /api/stations
export const getStations = async (req, res) => {
  try {
    const stations = await Station.find().sort({ stationId: 1 });
    res.json({
      success: true,
      count: stations.length,
      data: stations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve stations',
      error: error.message,
    });
  }
};

// @desc    Get station details with nodes and edges
// @route   GET /api/stations/:stationId
export const getStationDetails = async (req, res) => {
  try {
    const stationId = req.params.stationId.toUpperCase();
    const station = await Station.findOne({ stationId });

    if (!station) {
      return res.status(404).json({
        success: false,
        message: `Station with ID '${stationId}' not found`,
      });
    }

    const [nodes, edges] = await Promise.all([
      Node.find({ stationId }).sort({ nodeId: 1 }),
      Edge.find({ stationId }),
    ]);

    res.json({
      success: true,
      data: {
        station,
        nodes,
        edges,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve station details',
      error: error.message,
    });
  }
};
