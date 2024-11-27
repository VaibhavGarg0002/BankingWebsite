const express=require('express')
const router=express.Router();
const employmentDetailsController=require('../controllers/employmentDetailsController');

router.post('/employment-details/:_id',employmentDetailsController.createEmploymentDetails);
router.get('/employment-details/:_id',employmentDetailsController.getEmploymentDetailsById);
router.put('/employment-details/:_id',employmentDetailsController.updateEmploymentDetailsById);
router.delete('/employment-details/:_id',employmentDetailsController.deleteEmploymentDetailsById);

module.exports=router;

