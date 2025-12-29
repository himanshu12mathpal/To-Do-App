const mongoose=require('mongoose')
const User = require('./user.model')

const TodoSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        paragraph:{
            type:String,
            required:true,
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        }
    },
    {
        timestamps:true
    }
)

const todo=mongoose.model('todo',TodoSchema)
module.exports=todo