const Flight = require("../model/Flight");
const Airport = require("../model/Airport");
const Aircraft = require("../model/Aircraft");
const mongoose = require("mongoose")

exports.createFlight = async (req, res) => {
  const {
    aircraft,
    flightNumber,
    from,
    to,
    departureTime,
    arrivalTime,
    price,
  } = req.body;

  if (
    !aircraft ||
    !flightNumber ||
    !from ||
    !to ||
    !departureTime ||
    !arrivalTime ||
    !price
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (from === to) {
    return res
      .status(400)
      .json({ message: "From and To airports cannot be same" });
  }
  const plane = await Aircraft.findById(aircraft);
  if (!plane || !plane.isActive) {
    return res.status(400).json({ message: "Invalid aircraft" });
  }

  const flight = await Flight.create({
    aircraft,
    flightNumber,
    from,
    to,
    departureTime,
    arrivalTime,
    price,
    seatsAvailable : {
      economy : plane.seatLayout.economy,
      business : plane.seatLayout.business
    }
  });

  res.status(201).json({
    message: "Flight created successfully",
    flight,
  });
};

exports.getFlights = async (req, res) => {
  const flights = await Flight.find()
    .populate("from", "code city")
    .populate("to", "code city")
    .populate("aircraft", "model");

  res.status(200).json({
    count: flights.length,
    flights,
  });
};

exports.searchFlights = async (req, res) => {
  const { from, to, departDate, passenger = 1, cabinclass = "economy" } = req.query;

  if (!from || !to || !departDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (from === to) {
    return res.status(400).json({ message: "From and to cannot be same" });
  }

  const passengerCount = Number(passenger);
  if (passengerCount < 1) {
    return res.status(400).json({ message: "Invalid passenger count" });
  }

  const fromAirport = await Airport.findOne({ code: from });
  const toAirport = await Airport.findOne({ code: to });

  if (!fromAirport || !toAirport) {
    return res.status(404).json({ message: "Invalid airport" });
  }

 const start = new Date(departDate + "T00:00:00.000Z");
  const end = new Date(departDate + "T23:59:59.999Z");

  const flights = await Flight.find({
    from: fromAirport._id,
    to: toAirport._id,
    isActive: true,
  })
  .populate("from to aircraft");
  

  res.json({
    count: flights.length,
    flights
    
  });
  console.log({
  from: fromAirport._id,
  to: toAirport._id,
});

};

exports.searchbar = async (req, res) => {
  try {
    const city = req.query.city?.trim();

    if (!city) {
      return res.status(404).json({ message: "Fill the field  " });
    }

    const regex = new RegExp(`^${city}`, "i");

    const airports = await Airport.find({
      $or: [
        { city: regex },
        { code: regex },
        { country: regex },
        { name: { $regex: city, $options: "i" } },
      ],
    })
      .limit(10)
      .select("name city country code");

    res.json(airports);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAllFlight = async (req,res)=>{
    const flights = await Flight.find()

    res.status(200).json({flights})
}
exports.getFlightsbyId = async (req,res)=>{
  const id = req.params.id

  const user = await Flight.findById(id)
  if(!user){
    return res.status(403).json({message : "FLight not found"})
  }
  res.status(201).json(user)
}