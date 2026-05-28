const paymentService = require("../services/payment.service");
const Order = require("../models/Order");

const createPaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Verificar orden y dueño
    const order = await Order.findOne({
      where: {
        id: orderId,
        userId: req.user.id,
      },
    });

    if (!order) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    // Monto desde la DB, nunca del cliente
    const amount = order.total;

    const paymentIntent = await paymentService.createPaymentIntent(amount);

    await paymentService.savePayment({
      orderId,
      stripePaymentId: paymentIntent.id,
      amount,
      status: paymentIntent.status,
    });

    await Order.update(
      { status: "paid", paymentIntentId: paymentIntent.id },
      { where: { id: orderId } }
    );

    res.json({ success: true, clientSecret: paymentIntent.client_secret });

  } catch (error) {
    console.error("createPaymentIntent error:", error);
    res.status(500).json({ success: false, message: "Payment processing error" });
  }
};

module.exports = { createPaymentIntent };
