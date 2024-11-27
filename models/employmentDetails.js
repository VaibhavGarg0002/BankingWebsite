const mongoose=require('mongoose');
const { Schema }=mongoose;
const Customer=require('../models/customer');


const employmentDetailsSchema=new Schema({
  customerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Customer._id',
    required:true
  },
    employmentStatus:{
        type:String,
        enum:['student','full-time','part-time','self-employed','retired','not-employed'],
        required:[true,'employment status is required']
    },

    industry:{
        type:String,
        required:[true,'Industry is required'],
        validate:{
            validator:function(value)  {
              const validIndustries={
                'student':['Primary','Secondary','Senior Secondary','UnderGraduate','PostGraduate'],
                'full-time': ['Technology','Finance','public-sector','HealthCare','Non-IT'],
                'part-time':['Internship','Retail','Hospitality','Freelance'],
                'self-employed':['Buisness','Freelance'],
                'retired':['Army','Public sector'],
                'not-employed':['not employed']
              };
             // const employmentStatus=this.employmentStatus;
              return validIndustries[this.emplyomentStatus];
            },
            message:props =>`${props.value} is not a valid industry for the current employment status`

      }
    },

   annualIncome:{
    type:String,
    require:[true,"annual income is required"],
    enum:['0-₹20,000','₹20,000-50,000','₹50,000-₹1,00,000','Above ₹1,00,000']
   }
});

const EmploymentDetails=mongoose.model('EmploymentDetails',employmentDetailsSchema);

module.exports=EmploymentDetails;