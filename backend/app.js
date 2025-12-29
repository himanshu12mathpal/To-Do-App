const dotenv=require('dotenv')
dotenv.config()
const express=require('express')
const cors=require('cors')
const connectDb = require('./db/db.connect')
const Userrouter = require('./routes/user.routes')
const Todorouter = require('./routes/todo.routes')
const cookieParser = require("cookie-parser");

const app=express()
const Port=process.env.PORT


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
}))
app.use(cookieParser());
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('server is live');
    
})
app.use('/user',Userrouter)
app.use('/todo',Todorouter)


app.listen(Port,async ()=>{
    await connectDb()
    console.log('chl raha h '+Port)
    
})