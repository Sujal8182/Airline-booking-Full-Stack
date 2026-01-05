const mongoose = require("mongoose")

const Flightschema = new mongoose.Schema({
    
    airline: {
      type: String,
      required: true
    },

    flightNumber: {
      type: String,
      required: true
    },

    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airport",
      required: true
    },

    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airport",
      required: true
    },

    departureTime: {
      type: Date,
      required: true
    },

    arrivalTime: {
      type: Date,
      required: true
    },

    basePrice: {
      type: Number,
      required: true
    },

    seatsAvailable: {
      economy: {
        type: Number,
        required: true
      },
      business: {
        type: Number,
        required: true
      }
    },

    status: {
      type: String,
      enum: ["SCHEDULED", "CANCELLED"],
      default: "SCHEDULED"
    }

  
},{timestamps: true})

module.exports = mongoose.model("Flight", Flightschema)