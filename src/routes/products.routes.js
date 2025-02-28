const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/', productController.getProducts);
router.post('/', productController.addProduct);
router.delete('/:pid', productController.deleteProduct);

module.exports = router;
