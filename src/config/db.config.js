const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://pourbaix02:19544294@cluster0.hhljc.mongodb.net/ecommerce');
        console.log('Conectado a MongoDB exitosamente');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB; 