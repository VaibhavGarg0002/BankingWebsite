const express=require('express');
const router=express.Router();
const transactionController=require('../controllers/transactionController');

router.post('/transactions/:accountNumber',transactionController.createTransaction);
router.get('/transactions/:accountNumber',transactionController.getTansactions);

module.exports=router;

