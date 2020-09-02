const Product = require('../models/product');
const Category = require('../models/category')
var mkdirp = require('mkdirp');
var fs = require('fs-extra');
const valid = require('express-validator')
var resizeimg = require('resize-img'); 

exports.getproducts = async function (req,res,next){ 
    Product.find({}).exec(function(err,products){
        res.render('admin/products',{
            products:products,
        })
    })

} 

exports.getaddproduct = async function(req,res,next){ 
    title='';
    desc='';
    price='';
    Category.find(function(err,categories){ 
        res.render('admin/addproduct' , {
            title:title,
           
            categories:categories,
            desc:desc,
         
        });

    })  
} 



    exports.addproduct= async function(req,res,next){  

       // var img = typeof req.files.image !== "undefined" ? req.files.image.name : "";
       // var img = req.files.image;
     //valid('title').notEmpty();  
     if(!req.files){ imageFile =""; }

     if(req.files){
  
     var imageFile = typeof(req.files.image) !== "undefined" ? req.files.image.name : "";}
        var title = req.body.title; 
        var slug = req.body.slug;
        var desc = req.body.desc;
        var price= req.body.price; 
        var category = req.body.category; 
       // console.log(img);
  
        if(title==''||desc==''||price==''||category==''){
            req.session.message = {
                type: 'danger',
                intro: 'Empty fields! ',
                message: 'Title Cannot be empty!'
              }
               // res.locals.message=req.session.message;
                //console.log(req.session.message)
              res.redirect('/admin/products/addproduct') 
        } else { 
            var pricee = parseFloat(price).toFixed(2); 
            var product= new Product({
                title:title,
                slug:slug, 
                desc:desc,
                price:pricee,
                category:category,
                image:imageFile,
            })
           
            product.save(function (err) {
                if (err)
                    return console.log(err);
    
                  mkdirp('public/product-images/' + product._id)
                    .then (function(){  
                        console.log('done main')
                        if (imageFile != "") {
                            var productImage = req.files.image;  
                           
                            var path = 'public/product-images/' + product._id + '/' + imageFile;
            
                            productImage.mv(path, function (err) {
                                if(err)
                                return console.log(err);
                            });
                        }

                    }
                        
                       
                        )
              
        
                    mkdirp('public/product-images/' + product._id + '/gallery')
                    .then (result=> 
                        console.log('done'+ result)
                        )
        
                    mkdirp('public/product-images/' + product._id + '/gallery/thumbs')
                    .then (result=> 
                        console.log('done'+ result)
                        )
    
       
    
               // req.flash('success', 'Product added!'); 
               req.session.message = {
                type: 'success',
                intro: 'Done! ',
                message: 'added new prduct!'
              }
                res.redirect('/admin/products');
            });
            
     
        } }  

exports.geteditproduct = async function(req,res,next){ 
            title='';
            desc='';
            price='';
            Category.find(function(err,categories){ 
                Product.findById(req.params.id,function(err,p){ 
                    if(err){
                        console.log(err)
                        res.redirect('/admin/products');
                        
                 }else {
                      var gallerydir = 'public/product-images/' +p._id +'/gallery';
                      var galleryimages =null;
                      fs.readdir(gallerydir,function(err,files){
                          if (err) 
                                return console.log(err)
                                else {
                                    galleryimages= files   
                                   
                                    res.render('admin/editproduct' , { 
                                        title:p.title,
                                       product:p,
                                        categories:categories,
                                        desc:p.desc,
                                        category:p.category.replace(/\s+/g,'-').toLowerCase(),
                                        price:p.price,
                                        image:p.image,
                                        galleryimages:galleryimages
                                     
                                    });
                                }
                      })
                 }


                })  ;


            
        
            })  
        } 

        
exports.editproduct= async function(req,res,next){  

            // var img = typeof req.files.image !== "undefined" ? req.files.image.name : "";
            // var img = req.files.image;
          //valid('title').notEmpty();  
          if(!req.files){ imageFile =""; }
     
          if(req.files){
       
          var imageFile = typeof(req.files.image) !== "undefined" ? req.files.image.name : "";}
             var id = req.body.id;
             var title = req.body.title; 
             var slug = req.body.slug;
             var desc = req.body.desc;
             var price= req.body.price; 
             var category = req.body.category; 
             var pimage = req.body.pimage
             

       
             if(title==''||desc==''||price==''||category==''){
                 req.session.message = {
                     type: 'danger',
                     intro: 'Empty fields! ',
                     message: 'Title Cannot be empty!'
                   }
                    // res.locals.message=req.session.message;
                     //console.log(req.session.message)
                   res.redirect('/admin/products') 
             } else {  
               await  Product.findById(id,function(err,p){
                     if (err)
                            return console.log(err)
                        else {  
                          
                            p.title=title;
                            p.slug=slug;
                            p.desc=desc;
                            p.price=parseFloat(price).toFixed(2); ;
                            p.category=category;
                            if ( imageFile!= ""){
                                p.image=imageFile;
                            }
                           p.save(function(err){
                               if (err) 
                                    console.log(err) 
                               if (imageFile!=""){
                                   if(pimage!=""){
                                       fs.remove('/public/product-images/' + id + '/' + pimage,function(err){
                                           if (err){
                                               console.log(err)
                                           }
                                       })
                                   }  
                         var productImage = req.files.image;  
                           
                       var path = 'public/product-images/' + id + '/' + imageFile;
                   
                                   productImage.mv(path, function (err) {
                                       if(err)
                                       return console.log(err);
                                   });
                               }
                               req.session.message = {
                                type: 'success',
                                intro: 'Done! ',
                                message: 'prduct edited!'
                              }
                               res.redirect('/admin/products');
                           })
                            
                          
                        }
                 })
           
                        
             } }  
exports.productgallery = async function(req,res,next){
    
    var productImage = req.files.file;
    var id = req.params.id;
    var path = 'public/product-images/' + id + '/gallery/' + req.files.file.name;
    var thumbsPath = 'public/product-images/' + id + '/gallery/thumbs/' + req.files.file.name;

    productImage.mv(path,  ()=> {
            console.log(path)
            resizeimg(fs.readFileSync(path), {width: 100, height: 100}).then(function (buf) {
            fs.writeFileSync(thumbsPath, buf);
        });
    });

    
}

exports.deleteimage = async function(req,res,next){
    var originalimage = 'public/product-images/' + req.query.id + '/gallery/' + req.params.image;
    var thumb = 'public/product-images/' + req.query.id + '/gallery/thumbs' + req.params.image; 
    fs.remove(originalimage,function(err){
        if (err) {
             console.log(err)
        }else {
            fs.remove(thumb,function(err){
                if (err){
                    console.log(err)
                }else {
                    req.session.message = {
                        type: 'success',
                        intro: 'Done! ',
                        message: 'image deleted!'
                      }
                       res.redirect('/admin/products');
                }
            })
        }
    })
}
exports.deleteproduct = async function(req,res,next){ 
    var id = req.params.id; 
    var path = 'public/product-images/' + id;
    fs.remove(path, function(err){
        if (err){
            console.log(err)
        }else {
           Product.findByIdAndRemove(id,function(err){
                if (err){
                    console.log(err)
                }else { 
                    req.session.message = {
                        type: 'success',
                        intro: 'Done! ',
                        message: 'product deleted!'
                      }
                       res.redirect('/admin/products');

                }
            })
        }
    })

}
exports.deletemulti = async function(req,res,next){   
   // console.log('hi')
    if(req.body.selected){
        
        var paths =[];
        var x; 
       for(i=0;i<req.body.selected.length;i++){
          //  x= 'public/product-images/' + req.body.selected[i];
            paths[i]='public/product-images/' + req.body.selected[i];
        
        } 
       /* for(i=0;i<req.body.selected.length;i++){
           fs.remove(paths[i],function(err){
               if (err){
                   console.log(err)
               }else {
                   console.log('done')
               }
                
           })
          
          }  */
        /*  function cb (){
              console.log('no')
          }
          function deleteFiles(files, callback){
            if (files.length==0) callback();
            else {
               var f = files.pop();
               fs.unlink(f, function(err){
                  if (err) callback(err);
                  else {
                     console.log(f + ' deleted.');
                     deleteFiles(files, callback);
                  }
               });
            }
         }
         deleteFiles(paths,cb)
         

*/   
      /*   paths.forEach(path=>{
             fs.remove(path,function(err){
                 if (err)
                    console.log(err)
             });
           //  return console.log('ooo');
         })
   */
           Product.deleteMany({ '_id': { $in:req.body.selected } }, function(err, result) {
            if (err) {
              res.send(err);
            } else {
                req.session.message = {
                    type: 'success',
                    intro: 'Done! ',
                    message: 'all selected products deleted!'
                  }
                   res.redirect('/admin/products');
            }
          });
   


    }else { 
        console.log('no')

    }
}