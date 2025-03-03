const express = require('express');
const router = express.Router();

const productRoutes = require('./products.routes');
const cartRoutes = require('./carts.routes');
const viewsRouter = require('./views.routes');

router.use('/api/products', productRoutes);
router.use('/api/cart', cartRoutes);
router.use('/', viewsRouter);

module.exports = router;
