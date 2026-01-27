const mongoose = require("mongoose");

const Flightschema = new mongoose.Schema(
  {
    
    flightNumber: {
      type: String,
      required: true,
    },
    
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airport",
      required: true,
    },
    
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airport",
      required: true,
    },
    
    aircraft: { 
      type: mongoose.Schema.Types.ObjectId,
      ref : "Aircraft",
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },

    arrivalTime: {
      type: Date,
      required: true,
    },

    price: {
      economy: {
        type: Number,
        required: true,
      },
      business: {
        type: Number,
        default: 0,
      },
    },

    seatsAvailable: {
      economy: {
        type: Number,
        required: true,
      },
      business: {
        type: Number,
        default: 0,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Flight", Flightschema);
