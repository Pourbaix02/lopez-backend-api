const path = require('path');
const CartManager = require('../managers/CartManager');

const cartsFilePath = path.join(__dirname, '../../data/carts.json');
const productsFilePath = path.join(__dirname, '../../data/products.json');
const cartManager = new CartManager(cartsFilePath, productsFilePath);

exports.createCart = (req, res) => {
  try {
    const newCart = cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCartById = (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = cartManager.getCartById(cartId);
    if (cart.error) return res.status(404).json(cart);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addProductToCart = (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const result = cartManager.addProductToCart(cartId, productId);
    if (result.error) return res.status(404).json(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

