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

// router.get("/:orderId", async (req, res, next) => {
//   try {
//     const cart = await Order.findByPk(req.params.orderId, {
//       include: Product,
//     });
//     const productCart = await cart.getProducts();
//     console.log("PRODUCT CART", productCart);
//     res.status(200).json(productCart);
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/:userId", async (req, res, next) => {
  try {
    console.log("THIS IS THE USERID", req.params.userId);
    const order = await Order.findOne({
      where: {
        isComplete: false,
        userId: req.params.userId,
      },
    });
    const productCart = await order.getProducts();
    console.log("PRODUCT CART", productCart);
    res.status(200).json(productCart);
  } catch (error) {
    next(error);
  }
});

// router.put("/:productId/:userId", async (req, res, next) => {
//   const product = await Product.findByPk(req.params.productId);
//   const user = await User.findByPk(req.params.userId, {
//     include: Order,
//     where: {
//       isComplete: false,
//     },
//   });
//   const order = user.orders[0];
//   const newProduct = await order;
// });

// router.put("/:productId/:orderId", async (req, res, next) => {
//   const order = await Order.findByPk(req.params.orderId);
//   const productId = await Product.findByPk(req.params.productId);
//   console.log("THIS IS THE PRODUCT ID", productId);
//   if (order) {
//     try {
//       const orderUpdate = Order.update({ productId });
//       res.status(201).json(orderUpdate);
//     } catch (error) {
//       next(error);
//     }
//   }
// });

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
