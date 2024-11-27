const express=require('express');
const router =express.Router();
const loginDetailsController=require('../controllers/loginDetailsController');

router.post('/login-details/:_id',loginDetailsController.createLoginDetails);
router.get('/login-details/:_id',loginDetailsController.getLoginDetailsById);
router.put('/login-details/:_id',loginDetailsController.updateLoginDetails);
router.delete('/login-details/:_id',loginDetailsController.deleteLoginDetails);

module.exports=router;