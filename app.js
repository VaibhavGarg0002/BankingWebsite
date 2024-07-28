const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const customerRoutes=require('./routes/customer');
const loginDetailsRoutes=require('./routes/loginDetailsRoutes');
const employmentDetailsRoutes=require('./routes/employmentDetailsRoutes');
const accountRoutes=require('./routes/account');
const transactionRoutes=require('./routes/transaction');

const app=express();
const port=process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/customers',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  }).then(()=>{
    console.log('MongoDB connected...');
  }).catch((err)=>{
    console.error('MongoDB connection error:',err);
  });

app.use(bodyParser.json());
app.use('/api',customerRoutes);
app.use('/api',loginDetailsRoutes);
app.use('/api',employmentDetailsRoutes);
app.use('/api',accountRoutes);
app.use('/api',transactionRoutes);


app.listen(port,()=>{
    console.log('Server is running at http://localhost:${port}');

});