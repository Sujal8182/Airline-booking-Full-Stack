const express = require("express");
const { isAdmin } = require("../middleware/isAdmin");
const { isAuth } = require("../middleware/isAuth");
const { adminLogin, singleUser, getall, AddAirUser, Login } = require("../controller/userController");
const { authorizeRoles } = require("../middleware/role");
const { createAirport, getAirports } = require("../controller/adminController");
const { createFlight, getFlights } = require("../controller/flightController");

const router = express.Router();

router.get('/dashboard', isAuth,authorizeRoles("ADMIN"), (req,res)=>{
    res.status(200).json({
        message : "Welcom Admin",
        admin : req.user.name                 
    })
})
router.post('/login',isAuth,authorizeRoles("ADMIN"), adminLogin)
router.post('/addAirport', isAuth,authorizeRoles("ADMIN"), createAirport)
router.get("/airport", getAirports)
router.post('/addflight', isAuth, authorizeRoles("ADMIN"), createFlight)

router.get('/getflights', getFlights)


module.exports = router