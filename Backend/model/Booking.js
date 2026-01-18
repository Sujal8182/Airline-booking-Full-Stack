// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true
    },

    passengers: [
      {
        name: String,
        age: Number,
        seatClass: {
          type: String,
          enum: ["economy", "business"],
          default: "economy"
        }
      }
    ],

    totalPrice: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed"
    },

    bookedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookings", bookingSchema);
