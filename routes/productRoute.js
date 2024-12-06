const productController=require('../controllers/productController');

const productrouter=require('express').Router();


productrouter.post('/createProduct',productController.upload ,productController.addProduct);
productrouter.get('/getProducts',productController.getAllProducts);
productrouter.get('/getProduct/:id',productController.getProductById);
productrouter.get('/getUserProducts/:id',productController.getUserProducts);




module.exports=productrouter