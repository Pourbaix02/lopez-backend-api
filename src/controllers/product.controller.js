const path = require('path');
const ProductManager = require('../managers/ProductManager');

const productsFilePath = path.join(__dirname, '../../data/products.json');
const productManager = new ProductManager(productsFilePath);

exports.getProducts = (req, res) => {
  try {
    const products = productManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);
    if (product.error) return res.status(404).json(product);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addProduct = (req, res) => {
  try {
    productManager.addProduct(req.body);
    res.status(201).json({ message: "Producto agregado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const result = productManager.updateProduct(productId, req.body);
    if (result.error) return res.status(404).json(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const result = productManager.deleteProduct(productId);
    if (result.error) return res.status(404).json(result);
    res.json(result);
  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
