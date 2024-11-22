const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const jwt_key=process.env.JWTTOKEN_KEY ;

module.exports=router

// models

const companySignUpModel=require('../models/companies.model')
//admin login starts

router.post('/signup', async (req,res)=>{

    try{
        const {company_name,email,password}=req.body;

        const company=await companySignUpModel.findOne({email});
        if(company){
            res.json({message:'Mail ID Already Exist',status:302});
            return
        }

        const encryptedPassword=bcrypt.hash(password,10)

        const newModel=new companySignUpModel({
            company_name:company_name,
            email:email.toLowerCase(),
            password:await encryptedPassword
        })

        await newModel.save()
        res.json({result:'OK',status:200})

    }catch(error){
        res.status(400).json({message:error.message})
    }
})

router.post('/login', async (req,res)=>{

    try{
        const{email,password}=req.body;

        const company=await companySignUpModel.findOne({email})

        if(company){
            const IsPresent=await bcrypt.compare(password,company.password);

            if(IsPresent){
                res.status(200).json({token:generateTokenResponse(company),status:200,result:'FOUND',username:company.company_name,userId:company._id})
            }else{
                res.json({status:302,result:'Password Mismatch'})
            }
        }else{
            res.json({status:400,result:'Email not found'})
        }
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

generateTokenResponse=(company)=>{
    const token= jwt.sign({data:company},jwt_key,{expiresIn:'30d'});
    return token;
}

//Admin login ends

