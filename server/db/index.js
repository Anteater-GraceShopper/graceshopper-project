//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const Order = require("./models/Order");
//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: Cart });
Product.belongsToMany(Order, { through: Cart });

module.exports = {
  db,
  Cart,
  Order,
  User,
  Product,
};
