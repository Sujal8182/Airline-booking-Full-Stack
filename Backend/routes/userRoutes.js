const express = require("express")
const { AddAirUser, UpdateAirUser, deleteAirUser, Login, getMe, logout, createOrder, verifyPayment, } = require("../controller/userController")
const { isAuth } = require("../middleware/isAuth")
const { searchFlights, searchbar, getAllFlight, getFlightsbyId } = require("../controller/flightController")
const passengerValidator = require("../middleware/passengerValidator")

const Route = express.Router()

Route.post('/register', AddAirUser)
Route.post('/login', Login)
Route.get('/me', isAuth,getMe)
Route.post('/logout', isAuth, logout)
Route.delete('/delete/:id', deleteAirUser)
Route.put("/update/:id", UpdateAirUser)

Route.get("/searchflights", searchFlights)
Route.get("/search",searchbar)
Route.get('/searchflights', passengerValidator, searchFlights)
Route.get('/getallflight', getAllFlight)
Route.get('/flights/:id', getFlightsbyId)

Route.post('/verify-payment', verifyPayment)

module.exports = Route
