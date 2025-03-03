const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      return [];
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error("Error al guardar los productos:", error);
    }
  }

  addProduct(product) {
    try {
      const { title, description, price, thumbnails, code, stock, category, status = true } = product;

      if (!title || !description || !price || !thumbnails || !code || !stock || !category) {
        console.error("Todos los campos son obligatorios");
        return;
      }

      if (this.products.some(prod => prod.code === code)) {
        console.error(`El código ${code} ya está en uso.`);
        return;
      }

      const newProduct = {
        id: this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1,
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        category,
        status
      };

      this.products.push(newProduct);
      this.saveProducts();
      console.log("Producto agregado exitosamente");
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  }

  getProducts() {
    try {
      return this.products;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      return [];
    }
  }

  getProductById(id) {
    try {
      const product = this.products.find(product => product.id === id);
      if (!product) {
        console.error("Producto no encontrado");
        return { error: "Not found" };
      }
      return product;
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
      return { error: "Error al obtener producto" };
    }
  }

  updateProduct(id, updatedFields) {
    try {
      const index = this.products.findIndex(product => product.id === id);
      if (index === -1) {
        console.error("Producto no encontrado");
        return { error: "Not found" };
      }

      this.products[index] = { ...this.products[index], ...updatedFields, id };
      this.saveProducts();
      return this.products[index];
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      return { error: "Error al actualizar producto" };
    }
  }

  deleteProduct(id) {
    try {
      const index = this.products.findIndex(product => product.id === id);
      if (index === -1) {
        console.error("Producto no encontrado");
        return { error: "Not found" };
      }

      this.products.splice(index, 1);
      this.saveProducts();
      return { message: "Producto eliminado" };
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      return { error: "Error al eliminar producto" };
    }
  }
}

module.exports = ProductManager;

