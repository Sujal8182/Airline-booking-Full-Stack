const express = require("express");
const Booking = require("../model/Booking");
const { TokenGenerate } = require("../utils/Token");
const Flight = require("../model/Flight");

exports.createBooking = async (req, res) => {
  try {
    const { flightId, passengers, totalPrice, paymentId } = req.body;

    console.log("BOOKING BODY:", req.body);

    if (!flightId || !passengers?.length || !totalPrice) {
      return res.status(400).json({ message: "Missing booking data" });
    }

    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(400).json({ message: "Flight not found" });
    }

    const economyCount = passengers.filter(
      (p) => p.seatClass === "economy",
    ).length;

    const businessCount = passengers.filter(
      (p) => p.seatClass === "business",
    ).length;

    if (flight.seatsAvailable.economy < economyCount) {
      return res
        .status(400)
        .json({ message: "Not enough economy seats available" });
    }

    if (flight.seatsAvailable.business < businessCount) {
      return res
        .status(400)
        .json({ message: "Not enough business seats available" });
    }

    flight.seatsAvailable.economy -= economyCount;
    flight.seatsAvailable.business -= businessCount;
    await flight.save();

    const booking = await Booking.create({
      user: req.user_id,
      flight: flightId,
      passengers,
      totalPrice,
      paymentId,
      paymentStatus: "paid",
      status: "confirmed",
    });

    res.status(201).json({
      message: "Booking Confirmed",
      booking,
    });
  } catch (error) {
    console.error("BOOKING ERROR: ", error.message);
    console.error("MONGOOSE ERRORS:", error.errors);
    res.status(500).json({ message: "Booking failed.." });
  }
};
exports.getMyBookings = async (req, res) => {
  try {
    if (!req.user_id) {
      return res.status(400).json({ message: "Unauthorized" });
    }

    const bookings = await Booking.find({ user: req.user_id })
      .populate({
        path: "flight",
        model: "Flight",
        select: "from to departureTime price airline flightNumber",
        populate : [
          {path : "from" , select : "name code"},
          {path : "to", select : "name code"}
        ]
      })
      .sort({ createdAt: -1 });

    console.log("POPULATED BOOKINGS:", JSON.stringify(bookings, null, 2));

    res.status(201).json({ bookings });
  } catch (error) {
    console.error("MY BOOKING ERROR : ", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
