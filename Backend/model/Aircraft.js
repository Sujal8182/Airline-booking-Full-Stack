// models/Aircraft.js
const mongoose = require("mongoose");

const aircraftSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true
    },

    manufacturer: {
      type: String,
      required: true
    },

    
    seatLayout: {
      economy: {
        type: Number,
        required: true
      },
      business: {
        type: Number,
        default: 0
      }
    },
    totalSeats: {
      type: Number,
      required: true
    },
    
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Aircraft", aircraftSchema);
