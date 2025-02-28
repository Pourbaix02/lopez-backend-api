// app.js
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');

// Importar rutas
const productRoutes = require('./src/routes/products.routes');
const cartRoutes = require('./src/routes/carts.routes');
const viewsRouter = require('./src/routes/views.routes');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Middleware para parsear JSON
app.use(express.json());

// Configurar el motor de plantillas Handlebars
app.engine('handlebars', exphbs.engine({ 
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'src/views/layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));

// Montar rutas de API y vistas
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/', viewsRouter);

// Configuración de Socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Escuchar el evento 'newProduct' desde la vista realTimeProducts
  socket.on('newProduct', (productData) => {
    // Usamos tu ProductManager actual sin modificaciones
    const ProductManager = require('./src/managers/ProductManager');
    const productsFilePath = path.join(__dirname, 'data/products.json');
    const productManager = new ProductManager(productsFilePath);
    
    // Agregar el nuevo producto (productData debe incluir todos los campos requeridos)
    productManager.addProduct(productData);
    
    // Emitir la lista actualizada a todos los clientes conectados
    io.emit('updateProducts', productManager.getProducts());
  });

  // (Opcional) Escuchar eliminación de producto vía websockets
  socket.on('deleteProduct', (productId) => {
    const ProductManager = require('./src/managers/ProductManager');
    const productsFilePath = path.join(__dirname, 'data/products.json');
    const productManager = new ProductManager(productsFilePath);
    productManager.deleteProduct(parseInt(productId));
    io.emit('updateProducts', productManager.getProducts());
  });
});

// Permite acceder al objeto io desde otras partes del código, si se requiere
app.set('socketio', io);

const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

