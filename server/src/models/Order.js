const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "refunded", "cancelled"),
      defaultValue: "pending",
    },
    paymentIntentId: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

module.exports = Order;