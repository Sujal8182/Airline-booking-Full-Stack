const Airport = require("../model/Airport");
const AirCraft = require("../model/Aircraft");
const Flight = require("../model/Flight");
const Booking = require("../model/Booking");

exports.getDashboardstas = async (req, res) => {
  const [airports, aircraft, flights, bookings] = await Promise.all([
    Airport.countDocuments(),
    AirCraft.countDocuments(),
    Flight.countDocuments(),
    Booking.countDocuments(),
  ]);

  res.json({ airports, aircraft, flights, bookings });
};

exports.createAirport = async (req, res) => {
  const { name, city, country, code } = req.body;

  if (!name || !city || !country || !code) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const airportExists = await Airport.findOne({ code });
  if (airportExists) {
    return res.status(400).json({ message: "Airport already exists" });
  }

  const airport = Airport.create({
    name,
    city,
    country,
    code,
  });

  res.status(201).json({
    message: "Airport Created Successfully",
    data: airport,
  });
};

exports.createAircraft = async (req, res) => {
  const { model, manufacturer, seatLayout, totalSeats } = req.body;

  if (
    !model ||
    !manufacturer ||
    seatLayout?.economy === undefined ||
    seatLayout?.economy === null ||
    !totalSeats
  ) {
    return res.status(400).json({ message: "All fields required" });
  }

  const aircraft = await AirCraft.create({
    model,
    manufacturer,
    seatLayout,
    totalSeats,
  });

  res.status(201).json(aircraft);
};

exports.getAircraft = async (req, res) => {
  const aircraft = await AirCraft.find().sort({ createdAt: -1 });
  res.json(aircraft);
};

exports.toggleAircraft = async (req, res) => {
  const aircraft = await AirCraft.findById(req.params.id);
  if (!aircraft) {
    return res.status(404).json({ message: "Aircraft not found" });
  }

  aircraft.isActive = !aircraft.isActive;
  await aircraft.save();

  res.json(aircraft);
};

exports.getAirports = async (req, res) => {
  const airports = await Airport.find().sort({ city: 1 });

  res.status(200).json({
    count: airports.length,
    airports,
  });
};

exports.getBooking = async (req, res) => {
  const bookings = await Booking.find()
    .populate("user", "name email")
    .populate({
      path: "flight",
      populate: [
        { path: "from", select: "code" },
        { path: "to", select: "code" },
      ],
    })
    .sort({ createdAt: -1 });

  res.json(bookings);
};

exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("flight");

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (booking.status === "cancelled") {
    return res.status(400).json({ message: "Booking already cancelled" });
  }

  booking.passengers.forEach(p => {
    booking.flight.availableSeats[p.seatClass] += 1;
  });
};
