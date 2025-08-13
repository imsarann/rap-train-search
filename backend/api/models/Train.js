const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  station: {
    type: String,
    required: true
  },
  distanceFromPrevious: {
    type: Number,
    required: true,
    default: 0
  },
  departureTime: {
    type: String,
    required: true
  }
});

const trainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stops: [stopSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Train', trainSchema);
