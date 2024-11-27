const express=require('express');
const router=express.Router();

const customerController=require("../controllers/customerController");

router.post('/customers',customerController.createCustomer);
router.get('/customers',customerController.getCustomer);
router.get('/customers/:id',customerController.getCustomerById);
//router.get('/address-suggestions',customerController.getAddressSuggestions);
router.put('/customers/:id',customerController.updateCustomer);
router.delete('/customers/:id',customerController.deleteCustomer);


module.exports=router;