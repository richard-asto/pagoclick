const stripe = require("stripe")(
    process.env.STRIPE_SECRET_KEY
);

const Order =
    require("../models/Order");

const refundPayment =
    async (req, res) => {

        try {

            const { orderId } =
                req.params;

            /*
            |--------------------------------------------------------------------------
            | FIND ORDER
            |--------------------------------------------------------------------------
            */

            const order =
                await Order.findByPk(
                    orderId
                );

            if (!order) {

                return res.status(404)
                    .json({

                        success: false,

                        message:
                            "Order not found",
                    });
            }

            /*
            |--------------------------------------------------------------------------
            | VALIDATE
            |--------------------------------------------------------------------------
            */

            if (
                order.status ===
                "refunded"
            ) {

                return res.status(400)
                    .json({

                        success: false,

                        message:
                            "Order already refunded",
                    });
            }

            /*
            |--------------------------------------------------------------------------
            | STRIPE REFUND
            |--------------------------------------------------------------------------
            */

            await stripe.refunds.create({

                payment_intent:
                    order.paymentIntentId,
            });

            /*
            |--------------------------------------------------------------------------
            | UPDATE ORDER
            |--------------------------------------------------------------------------
            */

            order.status =
                "refunded";

            await order.save();

            /*
            |--------------------------------------------------------------------------
            | RESPONSE
            |--------------------------------------------------------------------------
            */

            res.json({

                success: true,

                message:
                    "Refund successful",
            });

        } catch (error) {
            console.log(error);

            res.status(500)
                .json({

                    success: false,

                    message:
                        error.message,
                });
        }
    };

module.exports = {
    refundPayment,
};