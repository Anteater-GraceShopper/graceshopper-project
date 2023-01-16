//this is the access point for all things database related!
const Sequelize = require("sequelize");

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const Order = require("./models/Order");
//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

Cart.belongsTo(Order);
Order.hasMany(Cart);

module.exports = {
  db,
  Cart,
  Order,
  User,
  Product,
};
