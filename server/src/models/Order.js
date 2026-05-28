const { DataTypes } =
  require("sequelize");

const sequelize =
  require("../config/db");

const User =
  require("./User");

const Order = sequelize.define(
  "Order",
  {

    id: {
      type: DataTypes.INTEGER,

      autoIncrement: true,

      primaryKey: true,
    },

    total: {
      type: DataTypes.DECIMAL(
        10,
        2
      ),

      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "pending",
        "paid",
        "refunded",
        "cancelled"
      ),

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

/*
|--------------------------------------------------------------------------
| RELATIONS
|--------------------------------------------------------------------------
*/
User.hasMany(Order, {
  foreignKey: "UserId",
});

Order.belongsTo(User, {
  foreignKey: "UserId",
});
/*
User.hasMany(Order);

Order.belongsTo(User);
*/

module.exports = Order;