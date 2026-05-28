import api from "../api/axios";

export const createOrder = async (
    total
) => {

    const response = await api.post(
        "/orders",
        {
            total,
        }
    );

    return response.data.order;
};

export const createPaymentIntent =
    async (
        amount,
        orderId
    ) => {

        const response = await api.post(
            "/payments/create-payment-intent",
            {
                amount,
                orderId,
            }
        );

        return response.data.clientSecret;
    };