const express = require("express");
const { isAdmin } = require("../middleware/isAdmin");
const { isAuth } = require("../middleware/isAuth");
const { adminLogin, singleUser, getall, AddAirUser, Login } = require("../controller/userController");
const { authorizeRoles } = require("../middleware/role");

const router = express.Router();

// router.post('/login', adminLogin)
// router.get('/:id',isAuth,isAdmin, singleUser)
// router.get('/getall', isAuth,isAdmin, getall)

router.get('/dashboard', isAuth, authorizeRoles("ADMIN"), (req,res)=>{
    res.status(200).json({
        message : "Welcom Admin",
        admin : req.user.name                 
    })
})
router.post('/register', AddAirUser)
router.post('/login',isAuth, adminLogin)


module.exports = router