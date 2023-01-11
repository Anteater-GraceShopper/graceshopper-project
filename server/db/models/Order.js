const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");
const Order = db.define("order", {
  userId: {
    type: Sequelize.INTEGER,
    // references: {
    //   model: "User",
    //   referencesKey: "id",
    // },
  },
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;
