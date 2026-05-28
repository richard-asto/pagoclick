const express = require("express");

const router = express.Router();

const productController = require(
  "../controllers/product.controller"
);

const authMiddleware = require(
  "../middlewares/auth.middleware"
);

const adminMiddleware = require(
  "../middlewares/admin.middleware"
);

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  productController.getProducts
);

router.get(
  "/:id",
  productController.getProductById
);

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  productController.createProduct
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.deleteProduct
);

module.exports = router;