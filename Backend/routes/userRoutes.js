const express = require("express")
const { AddAirUser, UpdateAirUser, deleteAirUser, Login, getMe, logout, } = require("../controller/userController")
const { isAuth } = require("../middleware/isAuth")

const Route = express.Router()

Route.post('/register', AddAirUser)
Route.put("/update/:id", UpdateAirUser)
Route.post('/login', Login)
Route.delete('/delete/:id', deleteAirUser)
Route.get('/me', isAuth,getMe)
Route.post('/logout', isAuth, logout)

module.exports = Route