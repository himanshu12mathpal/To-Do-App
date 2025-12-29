const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')


const UserSchema=new mongoose.Schema(
    {
        UserName:{
            type:String,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6,
        }
    },
    {
        timestamps:true,
    }
)

UserSchema.methods.genAuthToken=async function(){
    try {
       const token =  jwt.sign(
      { _id: this._id, email: this.email }, 
      process.env.JWT_SECRET,             
      { expiresIn: '7d' }               
    );
    return token
    } catch (error) {
        console.log('error in generate token')
        throw error
    }
}

UserSchema.methods.comparePassword=async function (password){
    return await bcrypt.compare(password,this.password)
    
}

const User=mongoose.model('User',UserSchema)

module.exports=User