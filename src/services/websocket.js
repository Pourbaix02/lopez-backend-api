const { Server } = require('socket.io');
const ProductManager = require('../managers/ProductManager');
const path = require('path');

const productsFilePath = path.join(__dirname, '../../data/products.json');
const productManager = new ProductManager(productsFilePath);

function setupWebSocket(httpServer) {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado');

        socket.emit('updateProducts', productManager.getProducts());

        socket.on('newProduct', (productData) => {
            productManager.addProduct(productData);
            io.emit('updateProducts', productManager.getProducts());
        });

        socket.on('deleteProduct', (productId) => {
            const deleted = productManager.deleteProduct(parseInt(productId));

            if (deleted.error) {
                socket.emit('errorMessage', deleted.error);
            } else {
                io.emit('updateProducts', productManager.getProducts());
            }
        });
    });

    return io;
}

module.exports = setupWebSocket;
