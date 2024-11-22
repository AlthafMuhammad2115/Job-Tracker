const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config()
const mongoString = process.env.DATABASE_URL;
const port =process.env.PORT;

//db

mongoose.connect(mongoString)
const database= mongoose.connection

database.on('error',error=>{
    console.log(error);
})

database.once('connected',()=>{
    console.log('Db Connected');
})


const app=express();

//cors setup

app.use(cors({
    credentials:true,
    origin: ["*"]
}))

app.options('*', cors());

app.use(express.json())

app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})

