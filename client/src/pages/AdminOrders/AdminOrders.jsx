import {
  useEffect,
  useState,
} from "react";

import Navbar from
  "../../components/Navbar/Navbar";

import {
  refundOrder,
} from "../../services/orderService";

import {
  getAllOrders,
} from "../../services/orderService";

import "./AdminOrders.css";

const AdminOrders = () => {

  const fetchOrders =
    async () => {

      try {

        const data =
          await getAllOrders();

        setOrders(
          data.orders
        );

      } catch (error) {

        console.log(error);
      }
    };


  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  
  const handleRefund =
    async (orderId) => {

      try {

        await refundOrder(
          orderId
        );

        fetchOrders();

        alert(
          "Refund successful"
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message
          || "Refund failed"
        );
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

      <div className="admin-orders-container">

        <h1>
          Orders Dashboard
        </h1>

        <div className="orders-table">

          <div className="orders-header">

            <span>ID</span>

            <span>User</span>

            <span>Email</span>

            <span>Total</span>

            <span>Status</span>

            <span>Date</span>

            <span>Actions</span>

          </div>

          {
            orders.map((order) => (

              <div
                className="orders-row"
                key={order.id}
              >

                <span>
                  #{order.id}
                </span>

                <span>
                  {order.User?.name}
                </span>

                <span>
                  {order.User?.email}
                </span>

                <span>
                  ${order.total}
                </span>

                <span
                  className={
                    getStatusClass(
                      order.status
                    )
                  }
                >
                  {order.status}
                </span>

                <span>

                  {
                    new Date(
                      order.createdAt
                    ).toLocaleDateString()
                  }



                </span>
                <button
                  className="refund-btn"

                  disabled={
                    order.status ===
                    "refunded"
                  }

                  onClick={() =>
                    handleRefund(order.id)
                  }
                >

                  {
                    order.status === "refunded"
                      ? "Refunded"
                      : "Refund"
                  }

                </button>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
};

export default AdminOrders;