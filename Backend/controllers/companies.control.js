const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const jwt_key=process.env.JWTTOKEN_KEY ;

const companySignUpModel=require('../models/companies.model')
const Job=require('../models/job.model')

exports.signup=async (req,res)=>{

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
}

exports.login=async (req,res)=>{

    try{
        const{email,password}=req.body;

        const company=await companySignUpModel.findOne({email})

        if(company){
            const IsPresent=await bcrypt.compare(password,company.password);

            if(IsPresent){
                res.status(200).json({token:generateTokenResponse(company),status:200,userid:company._id,company_name:company.company_name})
            }else{
                res.json({status:302,result:'Password Mismatch'})
            }
        }else{
            res.json({status:400,result:'Email not found'})
        }
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

generateTokenResponse=(company)=>{
    const token= jwt.sign({data:company},jwt_key,{expiresIn:'30d'});
    return token;
}

exports.list_company_job= async (req, res) => {
    try {
      const { companyId } = req.params;
  
      // Find all jobs posted by the specified company
      const jobs = await Job.find({ company_id: companyId });
  
      // If no jobs are found
      if (!jobs || jobs.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No jobs found for this company',
        });
      }
  
      // Respond with the list of jobs
      res.status(200).json({
        success: true,
        jobs,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching jobs',
      });
    }
  }