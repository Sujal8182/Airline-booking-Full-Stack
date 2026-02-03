// models/Booking.js
const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  age : {
    type : Number,
    required : true,
  },
  seatClass : {
    type : String,
    enum : ["economy", "business"],
    required : true  
  }
})

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

    passengers: {
      type : [passengerSchema],
      required :true
    },

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

module.exports = mongoose.model("Booking", bookingSchema);
