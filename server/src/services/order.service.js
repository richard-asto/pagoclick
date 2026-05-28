
const {
  Order,
  User,
} = require("../models");

/*
|--------------------------------------------------------------------------
| CREATE ORDER
|--------------------------------------------------------------------------
*/

const createOrder =
  async (data) => {

    const order =
      await Order.create(data);

    return order;
  };

/*
|--------------------------------------------------------------------------
| USER ORDERS
|--------------------------------------------------------------------------
*/

const getUserOrders =
  async (userId) => {

    return await Order.findAll({

      where: {
        UserId: userId,
      },

      order: [
        ["createdAt", "DESC"],
      ],
    });
  };

/*
|--------------------------------------------------------------------------
| ADMIN ORDERS
|--------------------------------------------------------------------------
*/

const getOrders =
  async () => {

    return await Order.findAll({

      include: [
        {
          model: User,

          attributes: [
            "id",
            "name",
            "email",
          ],
        },
      ],

      order: [
        ["createdAt", "DESC"],
      ],
    });
  };

module.exports = {

  createOrder,

  getOrders,

  getUserOrders,
};