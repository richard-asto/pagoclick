const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const Payment = require("./Payment");

/*
|--------------------------------------------------------------------------
| RELATIONS
|--------------------------------------------------------------------------
*/

/*
| User -> Orders
*/
User.hasMany(Order, {
  foreignKey: "userId",
});

Order.belongsTo(User, {
  foreignKey: "userId",
});

/*
| Order -> Payment
*/
Order.hasOne(Payment, {
  foreignKey: "orderId",
});

Payment.belongsTo(Order, {
  foreignKey: "orderId",
});

module.exports = {
  User,
  Product,
  Order,
  Payment,
};