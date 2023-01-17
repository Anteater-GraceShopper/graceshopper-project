const router = require("express").Router();
const { Order, User, Cart, Product } = require("../db");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();

    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        isComplete: false,
        userId: req.params.userId,
      },
    });
    const productCart = await order.getProducts();
    res.status(200).json(productCart);
  } catch (error) {
    next(error);
  }
});

router.put("/:userId/:productId", async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: {
        userId: req.params.userId,
        isComplete: false,
      },
    });
    const product = await Product.findOne({
      where: {
        id: req.params.productId,
      },
    });
    await order.addProduct(product);
    res.send(order);
  } catch (error) {
    next(error);
  }
});

router.put("/:orderId");
