const Flight = require("../model/Flight");
const Airport = require("../model/Airport");

exports.createFlight = async (req, res) => {
  const {
    airline,
    flightNumber,
    from,
    to,
    departureTime,
    arrivalTime,
    basePrice,
    seatsAvailable,
  } = req.body;

  if (
    !airline ||
    !flightNumber ||
    !from ||
    !to ||
    !departureTime ||
    !arrivalTime ||
    !basePrice ||
    !seatsAvailable
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const fromAirport = await Airport.findById(from);
  const toAirport = await Airport.findById(to);

  if (!fromAirport || !toAirport) {
    return res.status(400).json({ message: "Invalid airport reference" });
  }

  const flight = await Flight.create({
    airline,
    flightNumber,
    from,
    to,
    departureTime,
    arrivalTime,
    basePrice,
    seatsAvailable,
  });

  res.status(201).json({
    message: "Flight created successfully",
    flight,
  });
};

exports.getFlights = async (req, res) => {
  const flights = await Flight.find({ status: "SCHEDULED" });

  res.status(200).json({
    count: flights.length,
    flights,
  });
};

exports.searchFlights = async (req, res) => {
  const { from, to, date, passenger = 1, cabinclass = "economy" } = req.query;

  if (!from || !to || !date) {
    return res.status(400).json({ message: "Missing required search fields" });
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
    [seatField]: { $gte: passengercount },
  })
    .populate("from", "code city")
    .populate("to", "code city");

  const results = flights.map((flight) => {
    let price = flight.basePrice * passenger;

    if (cabinclass == "business") {
      price = price * 1.8;
    }

    return {
      id: flight._id,
      airline: flight.airline,
      flightNumber: flight.flightNumber,
      from: flight.from,
      to: flight.to,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      cabinclass,
      availableSeats: flight.seatsAvailable[cabinclass],
      totalPrice: Math.round(price),
    };
  });

  res.status(200).json({
    count: results.length,
    flights: results,
  });
};

exports.searchbar = async (req,res)=>{
  try {
    const city = req.query.city?.trim()

    if(!city){
      return res.status(404).json({message : "Fill the field  "})
    }

    const regex = new RegExp(`^${city}`, "i")

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

}
