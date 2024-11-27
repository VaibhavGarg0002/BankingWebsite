const AccountInfo=require('../models/accountInfo');
const CustomerTransaction=require('../models/customerTransactions');

exports.createTransaction=async(req,res)=>{
    try{
        
        
        const{name,type,amount}=req.body;
        const accountNumber=req.params.accountNumber;
        const account=await AccountInfo.findOne({accountNumber:accountNumber});
        

        if(!account){
            return res.staus(404).json({message:'account not found'});
        }
        
    const updatedBalance=type==='credit'? account.balance+amount:account.balance-amount;

    if(updatedBalance<0){
        return res.status(400).json({error:'insufficient balance for the transaction'});
    }

    
    console.log("updated balance is",updatedBalance);

    account.balance=updatedBalance;
    await account.save();
    const transaction={name,type,amount};
    const customerTransaction=await CustomerTransaction.findOneAndUpdate(
        {accountNumber:accountNumber},
        {$push:{transactions:transaction}},
        {new:true,upsert:true}
    );
    
    res.status(201).send(customerTransaction);
}
catch(error)
{
    res.status(500).send(error);
}
};

exports.getTansactions=async(req,res)=>{
    try{
    const transaction=await CustomerTransaction.find({"accountNumber":req.params.accountNumber});
    if(!transaction){
        return res.status(404).json({message:"No transaction found"});
    }
    res.status(500).json(transaction);
    }
    catch(error){
        res.status(400).send(error);
    }
};
