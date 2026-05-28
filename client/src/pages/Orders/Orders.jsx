import {
  useEffect,
  useState,
} from "react";

import Navbar from
  "../../components/Navbar/Navbar";

import {
  getMyOrders,
} from "../../services/orderService";

import "./Orders.css";

const Orders = () => {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders =
    async () => {

      try {

        const data =
          await getMyOrders();

        setOrders(
          data.orders
        );

      } catch (error) {

        console.log(error);
      }
    };

  const getStatusClass = (
    status
  ) => {

    switch (status) {

      case "paid":
        return "status-paid";

      case "pending":
        return "status-pending";

      case "refunded":
        return "status-refunded";

      default:
        return "status-cancelled";
    }
  };

  return (
    <div>

      <Navbar />

      <div className="orders-container">

        <h1>
          My Orders
        </h1>

        {
          orders.length === 0 ? (

            <div className="empty-orders">

              No orders yet

            </div>

          ) : (

            orders.map((order) => (

              <div
                className="order-card"
                key={order.id}
              >

                <div>

                  <h3>
                    Order #{order.id}
                  </h3>

                  <p>
                    Total:
                    ${order.total}
                  </p>

                  <small>

                    {
                      new Date(
                        order.createdAt
                      ).toLocaleString()
                    }

                  </small>

                </div>

                <span
                  className={
                    getStatusClass(
                      order.status
                    )
                  }
                >
                  {order.status}
                </span>

              </div>
            ))
          )
        }

      </div>

    </div>
  );
};

export default Orders;