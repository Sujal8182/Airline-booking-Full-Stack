const Airport = require("../model/Airport")

exports.createAirport = async (req,res)=>{
    const {name , city , country , code } = req.body

    if (!name || !city || !country || !code) {
    return res.status(400).json({ message: "All fields are required" })
    }

    const airportExists = await Airport.findOne({ code })
    if (airportExists) {
    return res.status(400).json({ message: "Airport already exists" })
    }

    const airport = Airport.create({
        name,
        city,
        country,
        code
    })

    res.status(201).json({
        message : "Airport Created Successfully",
        data : airport 
    })
}

exports.getAirports = async (req, res) => {
  const airports = await Airport.find().sort({ city: 1 })

  res.status(200).json({
    count: airports.length,
    airports
  })
}