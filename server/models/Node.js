import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema(
  {
    stationId: {
      type: String,
      required: true,
      ref: 'Station',
      trim: true,
    },
    nodeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nameTa: {
      type: String,
      default: '',
      trim: true,
    },
    nameHi: {
      type: String,
      default: '',
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        'gate',
        'hall',
        'lift',
        'stairs',
        'ramp',
        'platform',
        'restroom',
        'helpdesk',
        'subway',
        'fob',
      ],
    },
    floor: {
      type: String,
      required: true,
      default: 'Ground',
      trim: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    isAccessible: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    descriptionTa: {
      type: String,
      default: '',
      trim: true,
    },
    descriptionHi: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Node = mongoose.model('Node', nodeSchema);

export default Node;
