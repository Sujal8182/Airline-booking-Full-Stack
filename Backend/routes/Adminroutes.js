const express = require("express");
const { isAdmin } = require("../middleware/isAdmin");
const { isAuth } = require("../middleware/isAuth");
const { adminLogin, singleUser, getall, AddAirUser, Login } = require("../controller/userController");
const { authorizeRoles } = require("../middleware/role");
const { createAirport, getAirports, getDashboardstas, createAircraft, getAircraft, toggleAircraft, getBooking, cancelBooking } = require("../controller/adminController");
const { createFlight, getFlights } = require("../controller/flightController");

const router = express.Router();


router.post('/login',adminLogin)
router.post('/addAirport',isAuth, isAdmin, createAirport)
router.get("/airport",isAuth, isAdmin, getAirports)
router.post('/addflight',isAuth, isAdmin, createFlight)
router.get('/dashboard', isAuth, isAdmin,getDashboardstas)
router.get('/getflights',isAuth, isAdmin, getFlights)
router.post('/aircraft/add',isAuth, isAdmin, createAircraft)
router.get('/aircraft', isAuth, isAdmin,getAircraft)
router.patch('/aircraft/:id', isAuth, isAdmin,toggleAircraft)
router.get('/bookings', isAuth, isAdmin,getBooking)
router.patch('/:id/cancel', isAuth, isAdmin,cancelBooking)


module.exports = router