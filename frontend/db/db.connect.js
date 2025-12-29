const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()


const url=process.env.MONGO_DB_URL

const connectDb = async (req,res)=>{
    try {
        if(!url){
            return res.status(400).json({
                "message":"url is not present "
            })
        }
        const connect=await mongoose.connect(url)
        if(!connect){
            return res.status(400).json({
                'message':'connection failure'
            })
        }
        console.log('MongoDb connected')
    } catch (error) {
        console.log('Connection Failure',error)
    }
}


module.exports=connectDb