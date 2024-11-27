const mongoose=require('mongoose');
const { Schema }=mongoose;
const Customer=require('../models/customer');

const loginDetailsSchema=new Schema({
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'Customer._id',
        required:true
    },
    username:{
        type:String,
        required:[true,'Username is required'],
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        trim:'true',
        validate:[
            {
                validator:function(value){
                    return /[!@#$%^&*(),.?":{}|<>]/g.test(value);
                },
                message:"Password must contain atleast one special character"
            },
            {
                validator:function(value)
                {
                    return /\d/.test(value);
                },
                message:'Password must contain atleast one digit'

            },
            {
                validator:function(value)
                {
                    return value.length>8;
                },
                message:'Password should have atleast 8 characters'
            }
        ]
    },
   /* confirmPassword:{
        type:String,
        required:[true,'Confirm Password is required'],
        trim:true,
        validate:{
            validator:function(value){
                return value===this.password;
            },
            message:'Password donot match'
        }
    }*/
});

loginDetailsSchema.pre('save',function(next){
    this.confirmPassword=undefined;
    next();
});

const LoginDetails=mongoose.model('LoginDetails',loginDetailsSchema);

module.exports=LoginDetails;