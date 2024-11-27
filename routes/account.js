const express=require('express');
const router=express.Router();
const accountController=require('../controllers/accountController');

router.post('/accounts/:id/',accountController.createAccountInfo);
router.get('/accounts/:id',accountController.getAccountInfo);
router.delete('/accounts/:id/',accountController.deleteAccount);

module.exports=router;
