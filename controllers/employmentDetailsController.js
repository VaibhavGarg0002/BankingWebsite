const EmploymentDetails=require('../models/employmentDetails');
const Customer=require('../models/customer');
const mongoose=require('mongoose');

exports.createEmploymentDetails=async(req,res)=>{
    try{
        const{employmentStatus,industry,annualIncome}=req.body;
        const customerId=req.params._id;

        const customer=await Customer.findById(customerId);
        
        if(!customer){
            return res.statis(404).json({message:'Customer not found'});

        }
        const newEmploymentDetails=new EmploymentDetails({customerId,employmentStatus,industry,annualIncome});
        await newEmploymentDetails.save();
        res.status(201).json({
            id:newEmploymentDetails._id,
            message:'Employment details saved successfully',
            status:'SUCCESS'
        });
        }
        catch(error){
            res.status(400).send(error);
        }
    };

exports.getEmploymentDetailsById=async(req,res)=>{
    try{
        const customerId=req.params._id;
        const employmentDetails=await EmploymentDetails.findOne({customerId:customerId});
        if(!employmentDetails){
            return res.status(404).json({message:'Employment details not found'});
            }
            res.status(200).send(employmentDetails);
    }
    catch(error){
        res.status(500).send(error);
    }
};

exports.updateEmploymentDetailsById=async(req,res)=>
    {
        try
        {
            const customerId=req.params._id;
            
            
            const employmentDetails=await EmploymentDetails.findOneAndUpdate({customerId:customerId},req.body,
                {
                    new:true,
                    runValidators:true
                });
                
                
                if(!employmentDetails)
                    {
                        return res.status(404).json({message:'employment details not found'});
                    }
                    res.status(200).send(employmentDetaisl);
        }
        catch(error)
        {
            res.status(400).send(error);
        }
    };

    exports.deleteEmploymentDetailsById=async(req,res)=>{
        try{
            const employmentDetails=await EmploymentDetails.findOneAndDelete(req.params.id);
            if(!employmentDetails){
                return res.status(404).json({message:'employment dtails not found'});
            }
            res.status(200).send(employmentDetails);
        }
        catch(error){
            res.status(500).send(error);
        }
    };

