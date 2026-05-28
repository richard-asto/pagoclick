const { Product } = require("../models");

const createProduct = async (data) => {

  const product = await Product.create(data);

  return product;
};

const getProducts = async () => {

  return await Product.findAll({
    order: [["createdAt", "DESC"]],
  });
};

const getProductById = async (id) => {

  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const updateProduct = async (id, data) => {

  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await product.update(data);

  return product;
};

const deleteProduct = async (id) => {

  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await product.destroy();

  return true;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};