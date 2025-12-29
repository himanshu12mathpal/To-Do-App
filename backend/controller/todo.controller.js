    const todo=require('../models/todo.model')
    const authMiddleware=require('../middleware/auth.middleware')

    module.exports.createtodo=async (req,res)=>{
        try{
        const {title,paragraph}=req.body
        const id=req.user._id;
        if(!title||!paragraph){
            return res.status(400).json({"message":"all input field are required"})
        }
        const data=await todo.create({
            title,
            paragraph,
            user: id
        })
        res.status(200).json({
            status:"success",
            "message":"Notes created succesfully",
            data:data,
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            "message":"Internal server error"
        })
    }

    }

    module.exports.showTodo=async (req,res)=>{
        try{
    const datashow=await todo.find({ user: req.user._id })
    res.status(200).json(
        {
            status:"success",
            "message":"to do is shown ",
            data:datashow,
        }
    )}catch(error){
        console.log(error)
        res.status(500).json({
            'message':'internal server error'
        })
    }
    }

    module.exports.deleteTodo=async (req,res)=>{
        try{
        const {id}=req.params
        const deleted=await todo.findByIdAndDelete(id)
        if(!deleted){
            res.status(400).json({
                'message':'unable to delete'
            })
        }
        res.status(200).json({
            message:"deleted succesfully"
        })
    }catch(error){
        console.log(error)
        res.status(500).json({'message':'internal server error'})
    }
    }

    module.exports.updateTodo=async (req,res)=>{
        try {
            const {id}=req.params
            const {title,paragraph}=req.body
            const update=await todo.findByIdAndUpdate(id,{title,paragraph},{new:true})
            if(!update){
            return res.status(400).json({'message':'unable to update data'})
            }
            res.status(200).json({
                status:'success',
                'message':'updated succesfully',
                update:update
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                'message':'internal server error'
            })
        }
    }