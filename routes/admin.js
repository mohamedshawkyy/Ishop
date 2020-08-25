const express= require('express') ;
var router = express.Router();
const admincontroller = require('../controller/admin'); 
//get routes 
//router.get('/pages',admincontroller.getpages)  
router.get('/pages',admincontroller.getpages)
router.get('/addpage',admincontroller.getaddpage) 

//post routes 
router.post('/addpage',admincontroller.addpage)
router.post('/reorder',admincontroller.reorder)
module.exports = router;