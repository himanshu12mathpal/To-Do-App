const User=require('../models/user.model')
const bcrypt = require('bcrypt');  


module.exports.signup= async (req,res)=>{

    const {username,email,password}= req.body
    try {
        if(!email || !password){
            return res.status(400).json(
                {"message":"all input field are required"}
            )
        }

         const already=await User.findOne({email})
        if(already){
            return res.status(400).json({
                'message':'user already exists'
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const NewUser=await User.create({
            UserName:username,
            email:email,
            password:hashedPassword
        })

       

        const token=await NewUser.genAuthToken()

         res.cookie('token',token,{
          httpOnly: true,
         secure: false,
        sameSite: "lax",


    })
        if(!NewUser){
            res.status(400).json({"message":"unable to create user"})
        }
        res.status(200).json({
            status:"success",
            token,
            user:NewUser,
            "message":"user created succesfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            'message':'Internal server error'
        })
    }
}


module.exports.login=async(req,res)=>{
    try{
    const {email,password}=req.body

    if(!email || !password){
        return res.status(400).json({
            'message':'enter input field'
        })
    }
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({
            'message':'invalid credential'
        })
    }
    
    const pass=await user.comparePassword(password)
    if(!pass){
        res.status(400).json({
            'message':'invalid crendtial'
        })
    }

    user.password=undefined
    const token=await user.genAuthToken();
    res.cookie('token',token,{
          httpOnly: true,
         secure: false,
            sameSite: "lax",


    })
    res.status(200).json({
        status:'success',
        user:user,
        token,
        'message':"Login succesfully"
        
    })
}catch(error){
    console.log(error)
    res.status(500).json({
        'message':'internal server error'
    })
}
}

module.exports.logout=async(req,res)=>{
    try{
     res.clearCookie('token',{
         secure: false,
  sameSite: "lax",
     })
     res.status(200).json({
        "message":"Logout succesfully"
     })
    }catch(error){
        console.log('logout error')
        res.status(500).json({
            'message':'internal server error'
        })
    }
}