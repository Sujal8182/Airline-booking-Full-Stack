const express = require("express");
const { isAdmin } = require("../middleware/isAdmin");
const { isAuth } = require("../middleware/isAuth");
const { adminLogin, singleUser, getall } = require("../controller/userController");

const router = express.Router();

router.post('/login', adminLogin)
router.get('/:id',isAuth,isAdmin, singleUser)
router.get('/getall', isAuth,isAdmin, getall)
