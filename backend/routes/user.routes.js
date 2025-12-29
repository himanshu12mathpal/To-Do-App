const { signup, login, logout } = require("../controller/user.controller")
const express=require('express')
const authMiddleware = require("../middleware/auth.middleware")
const router=express.Router()


router.post('/register',signup)
router.post('/login',login)
router.post('/logout',authMiddleware,logout)




module.exports=router