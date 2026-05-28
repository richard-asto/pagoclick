const productService = require(
  "../services/product.service"
);

const createProduct = async (req, res) => {

  try {

    const product = await productService.createProduct(
      req.body
    );

    res.status(201).json({
      success: true,
      product,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

const getProducts = async (req, res) => {

  try {

    const products = await productService.getProducts();

    res.json({
      success: true,
      products,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getProductById = async (req, res) => {

  try {

    const product =
      await productService.getProductById(
        req.params.id
      );

    res.json({
      success: true,
      product,
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message,
    });

  }
};

const updateProduct = async (req, res) => {

  try {

    const product =
      await productService.updateProduct(
        req.params.id,
        req.body
      );

    res.json({
      success: true,
      product,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

const deleteProduct = async (req, res) => {

  try {

    await productService.deleteProduct(
      req.params.id
    );

    res.json({
      success: true,
      message: "Product deleted",
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};