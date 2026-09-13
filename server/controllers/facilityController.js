import Edge from '../models/Edge.js';

// @desc    Toggle edge operational status (e.g., simulate broken lift/escalator)
// @route   PATCH /api/facilities/toggle-edge
export const toggleEdgeStatus = async (req, res) => {
  try {
    const { edgeId, isOperational } = req.body;

    if (!edgeId || typeof isOperational !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Please provide edgeId and boolean isOperational in request body.',
      });
    }

    const edge = await Edge.findById(edgeId);

    if (!edge) {
      return res.status(404).json({
        success: false,
        message: `Edge with ID '${edgeId}' not found.`,
      });
    }

    edge.isOperational = isOperational;
    await edge.save();

    // Also synchronize reciprocal edge if exists
    await Edge.updateOne(
      {
        stationId: edge.stationId,
        fromNode: edge.toNode,
        toNode: edge.fromNode,
      },
      { isOperational }
    );

    res.json({
      success: true,
      message: `Edge operational status set to ${isOperational}.`,
      data: edge,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update edge status',
      error: error.message,
    });
  }
};
