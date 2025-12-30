const express = require("express")
const { AddAirUser, UpdateAirUser, deleteAirUser, Login, } = require("../controller/userController")
const { isAuth } = require("../middleware/isAuth")

const Route = express.Router()

Route.post('/add', AddAirUser)
Route.put("/update/:id", UpdateAirUser)
Route.post('/login',isAuth, Login)
Route.delete('/delete/:id', deleteAirUser)

module.exports = Route