
const orderService =
  require(
    "../services/order.service"
  );

/*
|--------------------------------------------------------------------------
| CREATE ORDER
|--------------------------------------------------------------------------
*/

const createOrder =
  async (req, res) => {

    try {

      const order =
        await orderService
          .createOrder({

            userId:
              req.user.id,

            total:
              req.body.total,

            status:
              "pending",
          });

      res.status(201).json({

        success: true,

        order,
      });

    } catch (error) {

      res.status(400).json({

        success: false,

        message:
          error.message,
      });
    }
  };

/*
|--------------------------------------------------------------------------
| USER ORDERS
|--------------------------------------------------------------------------
*/

const getMyOrders =
  async (req, res) => {

    try {

      const orders =
        await orderService
          .getUserOrders(
            req.user.id
          );

      res.json({

        success: true,

        orders,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };

/*
|--------------------------------------------------------------------------
| ADMIN ORDERS
|--------------------------------------------------------------------------
*/

const getOrders =
  async (req, res) => {

    try {

      const orders =
        await orderService
          .getOrders();

      res.json({

        success: true,

        orders,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };

module.exports = {

  createOrder,

  getOrders,

  getMyOrders,
};