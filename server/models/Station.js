import mongoose from 'mongoose';

const stationSchema = new mongoose.Schema(
  {
    stationId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
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
    city: {
      type: String,
      default: 'Chennai',
      trim: true,
    },
    canvasWidth: {
      type: Number,
      default: 800,
    },
    canvasHeight: {
      type: Number,
      default: 600,
    },
  },
  {
    timestamps: true,
  }
);

const Station = mongoose.model('Station', stationSchema);

export default Station;
