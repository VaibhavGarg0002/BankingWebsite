const LoginDetails = require('../models/loginDetails');
const Customer=require('../models/customer');
const mongoose=require('mongoose');
exports.createLoginDetails=async(req,res)=>{
    try{
        const {username,password,confirmPassword}=req.body;
        const  customerId = req.params._id;
      
        const customer=await Customer.findById(customerId);
                
        if(!customer){
            return res.status(404).json({message:'Customer not found'});
        }

        if(password!==confirmPassword){
            return res.status(400).json({message:'Password donot match'});
        }

       
        const newLoginDetails=new LoginDetails({customerId, username,password,confirmPassword})
        await newLoginDetails.save();
        res.status(201).json({
            id:newLoginDetails._id,
            message:'Login details created successfully',
            status:'SUCCESS'
        });
    }
    catch(error){
        res.status(400).send(error);

    }
};



exports.getLoginDetailsById=async(req,res)=>{
    try{
        const customerId=req.params._id;
       
        const loginDetails=await LoginDetails.findOne({customerId:customerId});
        
        
        if(!loginDetails){
            return res.status(404).json({message:'Login details not found'});
        }
        res.status(200).send(loginDetails);
    }
    catch(error){
        res.status(500).send(error);
    }
};

exports.updateLoginDetails=async(req,res)=>{
    try{

        const {password,confirmPassword}=req.body;
        if(password!==confirmPassword){
           
            return res.status(400).json({message:"Password donot match"});
        }

        const customerId=req.params._id;
              

        const loginDetails=await LoginDetails.findOneAndUpdate({customerId:customerId}  ,req.body,{
            new:true,
            runValidators:true
        });

        if(!loginDetails)
        {
            return res.status(404).json({message:'login details not found'})
        }
        res.status(200).send(loginDetails);
    }
    catch(error){
        res.status(400).send(error);
    }
};

exports.deleteLoginDetails=async(req,res)=>{
    try{
        const customerId=req.params._id;                    
        const loginDetails=await LoginDetails.findOneAndDelete({customerId:customerId});
       
        if(!loginDetails){
        return res.status(404).json({message:'Login details not found'})
        }

        res.status(200).json({message:'Login details deleted',status:'SUCCESS'});
    }
    catch(error){
        res.status(500).send(error);
    }
};

