const Customer=require('../models/customer');
const  {fetchAddressSuggestions }=require('../services/loqateService');


exports.createCustomer=async(req,res)=>{
    try{
       const {
        firstName,
        middleName,
        lastName,
        email,
        phone,
        dateOfBirth,
        address:{line1,
        line2,
        city,state,country,
        postalCode}
       }=req.body;

       const newCustomer=new Customer({
        firstName,
        middleName,
        lastName,
        email,
        phone,
        dateOfBirth,
        address:{
            line1,
            line2,
            city,
            state,
            country,
            postalCode
       }
    });
        await newCustomer.save();
        res.status(201).json({
            applicationId:newCustomer._id,
            description:'Customer has been registered successfully',
            status:'SUCCESS'
        });
    }
    catch (error){
        res.status(400).send(error);
    }
    };

exports.getCustomer=async(req,res)=>{
    try{
        const customers=await Customer.find().populate('address').exec();
        res.status(200).send(customers);
    }catch(error){
        res.status(500).send(error);

    }
    };

exports.getCustomerById=async(req,res)=>{
       try{
            const customer=await Customer.findById(req.params.id).populate('address').exec();
            if(!customer){
                return res.status(404).json({message:'Customer not found'});
            
            }
            res.status(200).send(customer);

        }catch (error){
            res.status(500).send(error);

        }
    };

exports.updateCustomer=async (req,res)=>{
    try{
        const customer =await Customer.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        if(!customer){
            return res.status(404).json({message:'Customer not found'});
        }
        res.status(200).send(customer);
    }
    catch(error){
        res.status(400).send(error);
    }
};

exports.deleteCustomer=async(req,res)=>{
    try{
        const customer=await Customer.findByIdAndDelete(req.params.id);
        if (!customer){
            return res.status(404).json({message:'Customer not found'});
        }
        res.status(200).send(customer);

    }catch(error){
        res.status(500).send(error);
    }
};
/*exports.getAddressSuggestions=async(req,res)=>{
    try{
        const query=req.query.q;
        const suggestions=await fetchAddressSuggestions(query);
        res.status(200).json(suggestions);

    }catch(error){
        res.status(500).send(error);
    }
};


module.exports={createCustomer};*/