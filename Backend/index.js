const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config()
const mongoString = process.env.DATABASE_URL;
const port =process.env.PORT;

//routes
const companyRoutes=require('./routes/companies.routes');
const jobRoutes=require('./routes/job.routes');
const userRoutes=require('./routes/user.routes');
const applicationRoutes=require('./routes/applications.routes');

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
    origin: ["http://localhost:4200","https://job-seeker-git-master-muhammad-althafs-projects.vercel.app"]
}))

app.options('*', cors());

app.use(express.json())

app.use('/api/company',companyRoutes);
app.use('/api/job',jobRoutes);
app.use('/api/user',userRoutes);
app.use('/api/application',applicationRoutes);

app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})

