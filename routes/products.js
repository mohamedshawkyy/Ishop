const express= require('express') ;
var router = express.Router();
const adminproduct = require('../controller/product');

// get routes
router.get('/',adminproduct.getproducts) 
router.get('/addproduct',adminproduct.getaddproduct) 
router.get('/editproduct/:id',adminproduct.geteditproduct) 
router.get('/deleteimage/:image',adminproduct.deleteimage) 
router.get('/deleteproduct/:id',adminproduct.deleteproduct) 

// post routes 
router.post('/addproduct',adminproduct.addproduct);
router.post('/editproduct',adminproduct.editproduct) 
router.post('/productgallery/:id',adminproduct.productgallery) 
router.post('/deletemulti',adminproduct.deletemulti);
module.exports = router;