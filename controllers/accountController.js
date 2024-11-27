const AccountInfo=require('../models/accountInfo');
const Customer=require('../models/customer');
const mongoose=require('mongoose');


exports.createAccountInfo=async(req,res)=>{
    try{
        
        const{accountType,accountNumber,balance,IfscCode}=req.body;
        
        const customerId=req.params.id;
        
        const customer=await Customer.findById(customerId);

        if(!customer){
            return res.status(404).json({message:'Customer not found'});
        }
        
        /*const account=new AccountInfo(req.body);
        await account.save();*/

        const newAccountInfo=new AccountInfo({customerId,accountType,accountNumber,balance,IfscCode});
        await newAccountInfo.save();

        res.status(201).json({id:newAccountInfo._id,message:'account successfully created',status:'Success'});
    }
    catch(error){
        res.status(400).send(error);
    }
    };

    exports.getAccountInfo=async(req,res)=>{
        try{
            const customerId=req.params.id;
            const account=await AccountInfo.findOne({"customerId":customerId});
            
            

            if(!account){
                return res.status(404).json({message:'account details not found'});
            }
            res.status(200).send(account);
        }
        catch(error){
            res.status(500).send(error);
        }
    };

    exports.deleteAccount=async(req,res)=>{
        try{
            const customerId=req.params.id;
            const account=await AccountInfo.findOneAndDelete({customerId:customerId});
            
            if(!account){
                return res.status(404).send({message:'account details not found'});
            }
            res.status(200).json({message:'account details deleted',status:'SUCCESS'});
        }
        catch(error){
            res.status(500).send(error);
        }
    };

