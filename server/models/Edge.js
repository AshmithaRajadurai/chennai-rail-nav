import mongoose from 'mongoose';

const edgeSchema = new mongoose.Schema(
  {
    stationId: {
      type: String,
      required: true,
      ref: 'Station',
      trim: true,
    },
    fromNode: {
      type: String,
      required: true,
      ref: 'Node',
      trim: true,
    },
    toNode: {
      type: String,
      required: true,
      ref: 'Node',
      trim: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    hasStairs: {
      type: Boolean,
      default: false,
    },
    hasElevator: {
      type: Boolean,
      default: false,
    },
    hasRamp: {
      type: Boolean,
      default: false,
    },
    isOperational: {
      type: Boolean,
      default: true,
    },
    instruction: {
      type: String,
      default: '',
      trim: true,
    },
    instructionTa: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure uniqueness per directed edge
edgeSchema.index({ stationId: 1, fromNode: 1, toNode: 1 }, { unique: true });

const Edge = mongoose.model('Edge', edgeSchema);

export default Edge;
