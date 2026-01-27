const Flight = require("../model/Flight");
const Airport = require("../model/Airport");
const Aircraft = require("../model/Aircraft");

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
  if(!from || !to || !departDate){
    return res.status(403).json({message : "All fields are required"})
  }

  if (from === to) {
    return res
      .status(400)
      .json({ message: "From and to airport cannot be same" });
  }

  if (!["economy", "business"].includes(cabinclass)) {
    return res.status(400).json({ message: "Invalid cabin class" });
  }

  const passengercount = Number(passenger);

  if (passengercount < 1) {
    return res.status(400).json({ message: "Passenger must be at least 1" });
  }

  const start = new Date(date);
  start.getUTCHours(0, 0, 0, 0);

  const end = new Date(date);
  end.getUTCHours(23, 59, 59, 999);

  const seatField =
    cabinclass === "economy"
      ? "seatsAvailable.economy"
      : "seatsAvailable.business";

  const flights = await Flight.find({
    from,
    to,
    status: "SCHEDULED",
    departureTime: { $gte: start, $lte: end },
    isActive : true,
    [seatField]: { $gte: passengercount },
  })
    .populate("from", "code city")
    .populate("to", "code city")
    .populate("aircraft", "model")

  const results = flights.map()
  
  ((flight) => {
    let price = flight.basePrice * passenger;

    if (cabinclass == "business") {
      price = price * 1.8;
    }

    // return {
    //   id: flight._id,
    //   airline: flight.airline,
    //   flightNumber: flight.flightNumber,  
    //   from: flight.from,
    //   to: flight.to,
    //   departureTime: flight.departureTime,
    //   arrivalTime: flight.arrivalTime,
    //   cabinclass,
    //   availableSeats: flight.seatsAvailable[cabinclass],
    //   totalPrice: Math.round(price),
    // };
  });

  res.status(200).json({
    message: "Search request received",
    count: results.length,
    route: `${from} → ${to}`,
    date: departDate,
    passenger,
    cabin,
    flights
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
