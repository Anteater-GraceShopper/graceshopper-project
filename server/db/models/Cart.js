const Sequelize = require("sequelize");
const db = require("../db");
const Order = require("./Order");
const Cart = db.define("cart", {
  orderId: {
    type: Sequelize.INTEGER,
    primaryKey: false,
    // references: {
    //   model: "Order",
    //   referencesKey: "id",
    // },
  },
  itemCount: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
  productId: {
    type: Sequelize.INTEGER,

    // references: {
    //   model: "Product",
    //   referencesKey: "id",
    // },
  },
});

module.exports = Cart;
