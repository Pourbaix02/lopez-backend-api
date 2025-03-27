const { Router } = require('express');
const ProductController = require('../controllers/product.controller');
const router = Router();

// Rutas de productos
router.get('/', ProductController.getProducts);
router.get('/:pid', ProductController.getProductById);
router.post('/', ProductController.createProduct);
router.put('/:pid', ProductController.updateProduct);
router.delete('/:pid', ProductController.deleteProduct);

module.exports = router;
