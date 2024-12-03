const express=require('express')
const cors=require('cors')
require('dotenv').config()
const port =process.env.PORT;
const {connectDB}=require('./config/db')
//routes
const companyRoutes=require('./routes/companies.routes');
const jobRoutes=require('./routes/job.routes');
const userRoutes=require('./routes/user.routes');
const applicationRoutes=require('./routes/applications.routes');


const {InitSentry}=require('./config/config')
const Sentry = require('@sentry/node');


//middlewares
const{errorHandler}=require('./middlewares/error.middleware')
//db

connectDB()

const app=express();

//cors setup

app.use(cors({
    credentials:true,
    origin: ["http://localhost:4200","https://job-seeker-git-master-muhammad-althafs-projects.vercel.app"]
}))

app.options('*', cors());

 InitSentry();

app.use(express.json())



app.use('/api/company',companyRoutes);
app.use('/api/job',jobRoutes);
app.use('/api/user',userRoutes);
app.use('/api/application',applicationRoutes);

  
app.use(errorHandler);


app.use((err, req, res, next) => {
    Sentry.captureException(err);
    next(err);
});
app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})

