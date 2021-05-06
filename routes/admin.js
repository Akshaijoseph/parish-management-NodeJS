var express = require('express');
const session = require('express-session');
const { resource, response } = require('../app');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper= require('../helpers/product-helpers')
/* GET users listing. */



router.get('/', function(req, res, next) {

  productHelpers.getAllProducts().then((products)=>{
   console.log(products) 
  res.render('admin/view-product', {admin:true,products})
 
})
  });
router.get('/add-product' ,function(req,res){
  res.render('admin/add-product',{admin:true})

})
router.post('/add-product',(req,res)=>{

  
  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    console.log(id);
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/add-product')

      }else{
        console.log(err)
      }
    })
    
  })
})
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId)
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
  
})
router.get('/edit-product/:id',async(req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  console.log(product)
  res.render('admin/edit-product',{product,admin:true})
})

router.post('/edit-product/:id',(req,res)=>{
  let id=req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
   res.redirect('/admin')
   if(req.files.Image){
     let image=req.files.Image
    image.mv('./public/product-images/'+id+'.jpg')
   }
  })
})

router.get('/All-product', function(req, res, next) {

  productHelpers.getProducts().then((products)=>{
   console.log(products) 
  res.render('admin/viewall-product', {admin:true,products})
 
})
  
 
})
router.get('/view-orders', function(req, res, next) {
  productHelpers.getAllOrders().then((orders)=>{
    console.log(orders)
    res.render('admin/view-orders',{admin:true,orders});
  })
  
})

router.get('/view-users', function(req, res, next) {
  productHelpers.getAllUsers().then((users)=>{
    console.log(users)
    res.render('admin/view-users',{admin:true,users});
  })
  
})
router.get('/view-appointment', function(req, res, next) {
  productHelpers.getAllappointment().then((users)=>{
    console.log(users)
    res.render('admin/view-appointment',{admin:true,users});
  })
  
})
router.get('/update-information',(req,res)=>{
  
     res.render('admin/update-information',{admin:true})
   
  
})
router.post('/update-information',(req,res)=>{
  console.log(req.body)
  productHelpers.updateInfo(req.body,(result)=>{
     res.render('admin/update-information',{admin:true})
  })
})


router.get('/delete-info/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId)
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/info-view/')
  })
  
})

router.get('/info-view', function(req, res, next) {
  productHelpers.getAllinfo().then((users)=>{
     console.log(users)
    res.render('admin/info-view',{users,admin:true});
  })
  
})




module.exports = router;
