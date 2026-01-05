const express = require("express")
const { AddAirUser, UpdateAirUser, deleteAirUser, Login, getMe, logout, } = require("../controller/userController")
const { isAuth } = require("../middleware/isAuth")
const { searchFlights } = require("../controller/flightController")

const Route = express.Router()

Route.post('/register', AddAirUser)
Route.post('/login', Login)
Route.get('/me', isAuth,getMe)
Route.post('/logout', isAuth, logout)
Route.delete('/delete/:id', deleteAirUser)
Route.put("/update/:id", UpdateAirUser)

Route.get("/search", searchFlights)

module.exports = Route
