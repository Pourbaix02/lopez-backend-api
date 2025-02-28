// src/routes/views.routes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const ProductManager = require('../managers/ProductManager');

const productsFilePath = path.join(__dirname, '../../data/products.json');
const productManager = new ProductManager(productsFilePath);

// Vista tradicional (HTTP) que muestra la lista de productos
router.get('/home', (req, res) => {
  const products = productManager.getProducts();
  res.render('home', { products });
});

// Vista en tiempo real que trabaja con websockets
router.get('/realtimeproducts', (req, res) => {
  const products = productManager.getProducts();
  res.render('realTimeProducts', { products });
});

module.exports = router;
