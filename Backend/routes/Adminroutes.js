const express = require("express");
const { isAdmin } = require("../middleware/isAdmin");
const { isAuth } = require("../middleware/isAuth");
const { adminLogin, singleUser, getall, AddAirUser, Login } = require("../controller/userController");
const { authorizeRoles } = require("../middleware/role");
const { createAirport, getAirports, getDashboardstas, createAircraft, getAircraft, toggleAircraft } = require("../controller/adminController");
const { createFlight, getFlights } = require("../controller/flightController");

const router = express.Router();


router.post('/login', adminLogin)
router.post('/addAirport', createAirport)
router.get("/airport", getAirports)
router.post('/addflight', createFlight)
router.get('/dashboard', getDashboardstas)
router.get('/getflights', getFlights)
router.post('/aircraft/add', createAircraft)
router.get('/aircraft', getAircraft)
router.patch('/aircraft/:id', toggleAircraft)


module.exports = router