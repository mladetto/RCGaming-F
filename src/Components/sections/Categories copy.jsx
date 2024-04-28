const CategoriesModel = require("../models/CategoriesModel");
const ProductModel = require("../models/ProductModel");
const {
  validateName,
  validateCategory,
  validateDescription,
  validatePrice,
  validateStock,
  validateImageUrl,
  validateCharacteristic,
} = require("../util/helpers");

class ProductController {
  async Create(
    name,
    category_id,
    description,
    price,
    stock,
    imageUrl,
    characteristic,
    outstanding
  ) {
    if (!validateName(name)) {
      throw new Error("Nombre del producto invalido.");
    }
    if (!validateCategory(category_id)) {
      throw new Error("Categoría del producto invalida.");
    }
    if (!validateDescription(description)) {
      throw new Error("Descripción del producto invalido.");
    }
    if (!validatePrice(price)) {
      throw new Error("Precio del producto invalido.");
    }
    if (!validateStock(stock)) {
      throw new Error("Stock del producto invalido.");
    }
    if (!validateImageUrl(imageUrl)) {
      throw new Error("URL de la imagen del producto invalida.");
    }
    if (!validateCharacteristic(characteristic)) {
      throw new Error("La característica del producto invalida.");
    }

    try {
      const newProduct = new ProductModel({
        name: name,
        category_id: category_id,
        description: description,
        price: price,
        stock: stock,
        imageUrl: imageUrl,
        characteristic: characteristic,
        outstanding: outstanding,
        stockUpdateDate: new Date(),
      });

      await newProduct.save();
    } catch (error) {
      throw error;
    }
  }

  async GetById(id) {
    try {
      const product = await ProductModel.findById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async GetNewsProducts() {
    try {
      let ProductsNews = [];

      ProductsNews = await ProductModel.find({ outstanding: true });

      return ProductsNews;
    } catch (error) {
      throw error;
    }
  }

  async GetAllCategories() {
    try {
      let CategoriesResp = [];

      CategoriesResp = await CategoriesModel.find();

      return CategoriesResp;
    } catch (error) {
      throw error;
    }
  }

  async GetAllProducts() {
    try {
      const allProducts = await ProductModel.find()
      .populate('category_id','name')
      .exec();
      return allProducts;
    } catch (error) {
      throw error;
    }
  }

  async GetProductsByCategory(categoryId) {
    try {
        // Buscar la categoría por su ID para asegurarnos de que existe
        const category = await CategoriesModel.findById(categoryId);
        if (!category) {
            throw new Error("Categoría no encontrada");
        }

        // Buscar productos que pertenecen a la categoría específica
        const products = await ProductModel.find({ category_id: categoryId });
        return products;
    } catch (error) {
        throw error;
    }
  }

  async UpdateProduct(_id, newData) {
    try {
      const product = await ProductModel.findById(_id);

      if (!product) {
        throw new Error("Producto no encontrado");
      }

      product.name = newData.name;
      product.category_id = newData.category_id;
      product.description = newData.description;
      product.price = newData.price;
      product.stock = newData.stock;
      product.imageUrl = newData.imageUrl;
      product.characteristic = newData.characteristic;
      product.outstanding = newData.outstanding;
      product.stockUpdateDate = newData.stockUpdateDate;

      await product.save();
    } catch (error) {
      throw error;
    }
  };

  async DeleteProduct(_id) {
    try {
      await ProductModel.findByIdAndDelete(_id);

    } catch (error) {
      throw error;
    }
  };

}

module.exports = ProductController;

