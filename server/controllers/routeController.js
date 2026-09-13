import Node from '../models/Node.js';
import Edge from '../models/Edge.js';
import { findPath } from '../utils/dijkstra.js';

// @desc    Calculate shortest/accessible route between station nodes
// @route   POST /api/routes/navigate
export const calculateRoute = async (req, res) => {
  try {
    const { stationId, startNodeId, endNodeId, requireAccessible = false } = req.body;

    if (!stationId || !startNodeId || !endNodeId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide stationId, startNodeId, and endNodeId in the request body.',
      });
    }

    const upperStationId = stationId.toUpperCase();

    // Fetch station nodes and edges
    const [nodes, edges] = await Promise.all([
      Node.find({ stationId: upperStationId }),
      Edge.find({ stationId: upperStationId }),
    ]);

    if (!nodes || nodes.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No layout data found for station '${upperStationId}'.`,
      });
    }

    const result = findPath(nodes, edges, startNodeId, endNodeId, {
      requireAccessible: Boolean(requireAccessible),
    });

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message || 'No accessible route found between selected points.',
        messageTa: result.messageTa || 'தேர்ந்தெடுக்கப்பட்ட இடங்களுக்கு இடையே மாற்றுத்திறனாளி / அணுகக்கூடிய பாதை இல்லை.',
      });
    }

    res.json({
      success: true,
      data: {
        stationId: upperStationId,
        startNodeId,
        endNodeId,
        requireAccessible: Boolean(requireAccessible),
        totalDistance: result.totalDistance,
        pathNodes: result.pathNodes,
        instructions: result.instructions,
        instructionsTa: result.instructionsTa,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Route calculation failed',
      error: error.message,
    });
  }
};
