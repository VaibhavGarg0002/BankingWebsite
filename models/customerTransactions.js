const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const transactionSchema=new Schema({
    name:{
        type:String,
        enum:['cash deposit','upi transaction','cheque deposit','self cheque','atm withdrawal'],
        required:true
    },
    type:{
        type:String,
        enum:['credit','debit'],
        required:true
    },
    amount:{
        type:Number,
        required:true,
        min:0
    
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const customerTransactionSchema=new Schema({
    accountNumber:{
        type:Number,
        ref:'AccountInfo.accountNumber',
        required:true
    },
    transactions:{
        type:[transactionSchema]
        
    }
});

const CustomerTransaction=mongoose.model('CustomerTransaction',customerTransactionSchema);
module.exports=CustomerTransaction;

