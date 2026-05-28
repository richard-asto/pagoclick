const express =
    require("express");

const router =
    express.Router();

const refundController =
    require(
        "../controllers/refund.controller"
    );

const authMiddleware =
    require(
        "../middlewares/auth.middleware"
    );

const adminMiddleware =
    require(
        "../middlewares/admin.middleware"
    );

router.post(
    "/:orderId",

    authMiddleware,

    adminMiddleware,

    refundController
        .refundPayment
);

module.exports = router;