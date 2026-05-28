const stripe = require("../config/stripe");

const { Payment } = require("../models");

const createPaymentIntent = async (
  amount
) => {

  const paymentIntent =
    await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

  return paymentIntent;
};

const savePayment = async (data) => {

  const payment = await Payment.create(data);

  return payment;
};

module.exports = {
  createPaymentIntent,
  savePayment,
};