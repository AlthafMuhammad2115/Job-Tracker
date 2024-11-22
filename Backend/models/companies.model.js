const mongoose=require('mongoose')

const CompanySchema=new mongoose.Schema({
    company_name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    }
})

module.exports=mongoose.model('Companies',CompanySchema)