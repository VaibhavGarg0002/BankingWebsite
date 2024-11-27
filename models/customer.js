const mongoose=require('mongoose');
const { Schema }=mongoose;
const moment=require('moment');
const addressSchema=new Schema({
       line1:{type:String,required:[true,'line is required']},
       line2:{type:String},
       city:{type:String,required:[true,'city is required']},
       state:{type:String,required:[true,'state is required']},
       country:{type:String,required:[true,'country is required']},
       postalCode:{type:Number,required:[true,'postal code is required']}

});
const customerSchema=new Schema({
    firstName:{
        type:String,
        required:[true,'Name is required'],
        trim:true 
    },
    middleName:{
        type:String,
        required:[false],
        trim:true
    },
    lastName:{
        type:String,
        required:[true,'Lastname is required'],
        trim:true
    },
    dateOfBirth:{
        type:Date,
        required:[true,'Date of birth is required'],
        validate:{
            validator:function (value){
                const age=moment().diff(moment(value),'years');
                return age>=18;
            },
            message:'Customer must be atleast 18 years old'
        }
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        trim:true,
        match:[/\S+@\S+\.\S+/,'Email is not valid']
    },
    phone:{
        type:Number,
        required:[true,'Phone number is required'],
        trim:true,
        match:[/^\d{10}$/,'Phone number should be of 10 digits']
    },
    
    address:{
        type:addressSchema,
         required:true
}
});

const Customer=mongoose.model('Customer',customerSchema);

module.exports=Customer;