const fs = require('fs');

class CartManager {
  constructor(cartPath, productPath) {
    this.cartPath = cartPath;
    this.productPath = productPath;
    this.carts = this.loadCarts();
    this.products = this.loadProducts();
  }

  loadCarts() {
    try {
      if (!fs.existsSync(this.cartPath)) return [];
      const data = fs.readFileSync(this.cartPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar carritos:", error.message);
      return [];
    }
  }

  loadProducts() {
    try {
      if (!fs.existsSync(this.productPath)) return [];
      const data = fs.readFileSync(this.productPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar productos:", error.message);
      return [];
    }
  }

  saveCarts() {
    try {
      fs.writeFileSync(this.cartPath, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      console.error("Error al guardar carritos:", error.message);
    }
  }

  createCart() {
    try {
      const newCart = {
        id: this.carts.length > 0 ? this.carts[this.carts.length - 1].id + 1 : 1,
        products: []
      };

      this.carts.push(newCart);
      this.saveCarts();
      return newCart;
    } catch (error) {
      console.error("Error al crear carrito:", error.message);
      return { error: "Error al crear carrito" };
    }
  }

  getCartById(id) {
    try {
      const cart = this.carts.find(cart => cart.id === id);
      if (!cart) {
        console.error("Carrito no encontrado");
        return { error: "Carrito no encontrado" };
      }
      return cart;
    } catch (error) {
      console.error("Error al obtener carrito:", error.message);
      return { error: "Error al obtener carrito" };
    }
  }

  addProductToCart(cartId, productId) {
    try {
      this.products = this.loadProducts();

      const product = this.products.find(p => p.id === productId);
      if (!product) {
        console.error("Producto no encontrado en el catálogo");
        return { error: "Producto no encontrado en el catálogo" };
      }

      const cart = this.carts.find(cart => cart.id === cartId);
      if (!cart) {
        console.error("Carrito no encontrado");
        return { error: "Carrito no encontrado" };
      }

      const productIndex = cart.products.findIndex(item => item.productId === productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }

      this.saveCarts();
      return cart;
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error.message);
      return { error: "Error al agregar producto al carrito" };
    }
  }
}

module.exports = CartManager;

