const express=require('express')
const authMiddleware = require("../middleware/auth.middleware")
const { createtodo, showTodo, deleteTodo, updateTodo } = require('../controller/todo.controller')
const router=express.Router()


router.use(authMiddleware)

router.post('/create',createtodo)
router.get('/show',showTodo)
router.get('/show/:id',showTodo)
router.delete('/delete/:id',deleteTodo)
router.put('/update/:id',updateTodo)

module.exports=router