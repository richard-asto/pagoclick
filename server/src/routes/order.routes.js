const express =
  require("express");

const router =
  express.Router();

const orderController =
  require(
    "../controllers/order.controller"
  );

const authMiddleware =
  require(
    "../middlewares/auth.middleware"
  );

const adminMiddleware =
  require(
    "../middlewares/admin.middleware"
  );

/*
|--------------------------------------------------------------------------
| CREATE ORDER
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authMiddleware,
  orderController.createOrder
);

/*
|--------------------------------------------------------------------------
| USER ORDERS
|--------------------------------------------------------------------------
*/

router.get(
  "/my-orders",
  authMiddleware,
  orderController.getMyOrders
);

/*
|--------------------------------------------------------------------------
| ADMIN ORDERS
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  orderController.getOrders
);

module.exports = router;