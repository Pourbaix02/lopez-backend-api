const express = require('express');
const router = express.Router();
const path = require('path');
const ProductManager = require('../managers/ProductManager');

const productsFilePath = path.join(__dirname, '../../data/products.json');
const productManager = new ProductManager(productsFilePath);

//Vista con formulario.
router.get('/home', (req, res) => {
  const products = productManager.getProducts();
  res.render('home', { products });
});

//Vista en tiempo real.
router.get('/realtimeproducts', (req, res) => {
  const products = productManager.getProducts();
  res.render('realTimeProducts', { products });
});

//Manejo de formulario HTTP.
router.post('/products', (req, res) => {
  const newProduct = req.body;
  productManager.addProduct(newProduct);

//Recargar pagina para ver cambios. 
  res.redirect('/home');
});

module.exports = router;
