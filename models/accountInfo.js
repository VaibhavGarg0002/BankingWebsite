const mongoose=require('mongoose');
const {Schema}=mongoose;
const Customer=require('../models/customer');
const accountInfoSchema=new Schema({
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'Customer._id',
        required:true
    },
    accountType:{
        type:String,
        enum:['savings','current','overdraft'],
        required:true
    },
    accountNumber:{
        type:Number,
        required:true,
        unique:true
    },
    balance:{
        type:Number,
        required:true,
        min:0
    },
    IfscCode:{
        type:String,
        required:true
    }

});

const AccountInfo=mongoose.model('AccountInfo',accountInfoSchema);

module.exports= AccountInfo;