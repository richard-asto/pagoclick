import api from "../api/axios";

/*
|--------------------------------------------------------------------------
| USER ORDERS
|--------------------------------------------------------------------------
*/

export const getMyOrders =
  async () => {

    const response =
      await api.get(
        "/orders/my-orders"
      );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| ADMIN ORDERS
|--------------------------------------------------------------------------
*/

export const getAllOrders =
  async () => {

    const response =
      await api.get(
        "/orders"
      );

    return response.data;
  };

  export const refundOrder =
  async (orderId) => {

    const response =
      await api.post(
        `/refunds/${orderId}`
      );

    return response.data;
  };