const Sequelize = require("sequelize");
const db = require("../db");
const Order = require("./Order");
const Cart = db.define("cart", {
  itemCount: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
});

module.exports = Cart;
