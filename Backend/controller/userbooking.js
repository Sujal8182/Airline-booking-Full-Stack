const express = require("express");
const Booking = require("../model/userBooking");
const { TokenGenerate } = require("../utils/Token");
const Flight = require("../model/Flight");

exports.Addbooking = async (req, res) => {
  const Id = req.params.id;

  if (!Id) {
    return res.status(404).json({ message: "User not found" });
  }

  const { from, to, depart } = req.body;

  if (!from || !to || !depart) {
    return res.status(404).json({ message: "All fields are required" });
  }

  const Extbooking = await Booking.findOne({ depart });
  if (Extbooking) {
    return res.status(404).json({ message: "Booking already done" });
  }
  const user = await Booking.create({
    from,
    to,
    depart,
  });
  const token = TokenGenerate(user._id, res);

  return res.status(201).json({ message: "Booking successfull", user, token });
};

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
    console.error("BOOKING ERROR: ", error);
    res.status(500).json({ message: "Booking failed.." });
  }
};
