const express= require('express') ;
var router = express.Router();
const admincontroller = require('../controller/admin'); 
//get routes 
//router.get('/pages',admincontroller.getpages)  
router.get('/pages',admincontroller.getpages)
router.get('/addpage',admincontroller.getaddpage) 
router.get('/editpage/:id',admincontroller.geteditpage) 
router.get('/deletepage/:id',admincontroller.deletepage) 
router.get('/categories',admincontroller.getcategories)
router.get('/addcategory',admincontroller.getaddcategory) 
router.get('/editcategory/:id',admincontroller.geteditcategory) 
router.get('/deletecategory/:id',admincontroller.deletecategory) 

//post routes 
router.post('/addpage',admincontroller.addpage)
router.post('/addcategory',admincontroller.addcategory)
router.post('/reorder',admincontroller.reorder)
router.post('/updatepage',admincontroller.updatepage)
router.post('/updatecategory',admincontroller.updatecategory)
module.exports = router;