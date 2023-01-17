const Sequelize = require("sequelize");

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const Order = require("./models/Order");

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: Cart });
Product.belongsToMany(Order, { through: Cart });

Order.hasMany(Cart);
Cart.belongsTo(Order);

Product.hasMany(Cart);
Cart.belongsTo(Product);

module.exports = {
  db,
  Cart,
  Order,
  User,
  Product,
};
