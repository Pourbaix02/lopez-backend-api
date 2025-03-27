const path = require('path');
const ProductManager = require('../managers/ProductManager');
const Product = require('../models/product.model');

const productsFilePath = path.join(__dirname, '../../data/products.json');
const productManager = new ProductManager(productsFilePath);

class ProductController {
  async getProducts(req, res) {
    try {
      const { 
        limit = 10, 
        page = 1, 
        sort, 
        query 
      } = req.query;

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: sort ? { price: sort === 'asc' ? 1 : -1 } : null,
        lean: true
      };

      const queryObject = {};
      if (query) {
        // Permitir búsqueda por categoría o disponibilidad
        if (query === 'available') {
          queryObject.stock = { $gt: 0 };
        } else {
          queryObject.category = query;
        }
      }

      const result = await Product.paginate(queryObject, options);

      res.json({
        status: 'success',
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null,
        nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null
      });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const { pid } = req.params;
      const product = await Product.findById(pid);
      
      if (!product) {
        return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
      }
      
      res.json({ status: 'success', payload: product });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async createProduct(req, res) {
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json({ status: 'success', payload: newProduct });
    } catch (error) {
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const { pid } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true });
      
      if (!updatedProduct) {
        return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
      }
      
      res.json({ status: 'success', payload: updatedProduct });
    } catch (error) {
      res.status(400).json({ status: 'error', error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { pid } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(pid);
      
      if (!deletedProduct) {
        return res.status(404).json({ 
          status: 'error', 
          error: 'Producto no encontrado' 
        });
      }

      res.json({ 
        status: 'success', 
        message: 'Producto eliminado exitosamente' 
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error', 
        error: error.message 
      });
    }
  }
}

module.exports = new ProductController();
