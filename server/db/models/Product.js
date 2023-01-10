const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://t4.ftcdn.net/jpg/04/24/37/77/360_F_424377780_eNL2pY8hjrtWzYxoqKiHI84CiwT5LJ1p.jpg",
  },
});

module.exports = Product;
