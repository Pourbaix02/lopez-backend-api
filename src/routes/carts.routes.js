const { Router } = require('express');
const CartController = require('../controllers/cart.controller');
const router = Router();

// Rutas de carritos
router.get('/:cid', CartController.getCart);
router.post('/', CartController.createCart);
router.post('/:cid/product/:pid', CartController.addProductToCart);
router.delete('/:cid/products/:pid', CartController.removeProductFromCart);
router.put('/:cid', CartController.updateCart);
router.put('/:cid/products/:pid', CartController.updateProductQuantity);
router.delete('/:cid', CartController.clearCart);

module.exports = router;

