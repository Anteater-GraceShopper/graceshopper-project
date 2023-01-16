const router = require("express").Router();

const { Cart, Product } = require("../db");
module.exports = router;

//view the entire cart
router.get("/", async (req, res, next) => {
  try {
    console.log("Cart", Object.keys(Cart.prototype));
    const cart = await Cart.findAll({ include: { model: Product } });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// router.post("/", async (req, res, next) => {
//   try {
//     res.send(await Cart.create(req.body));
//   } catch (err) {
//     next(err);
//   }
// });

//how do we determine if the user is logged in or not?

//update the product number
// router.put("/:productId", async (req, res, next) => {
//   try {
//     const product = await Cart.findByPk(req.params.productId);
//     res.send(await Cart.update(product));
//   } catch (err) {
//     next(err);
//   }
// });

// router.get("/order/:orderId", async (req, res, next) => {
//   try {
//     const orderId = req.params.orderId;
//     const cart = await Cart_Item.findAll({
//       where: {
//         orderId: orderId,
//       },
//     });
//     res.status(200).json(cart);
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/cart/addToCart", async (req, res, next) => {

// }

//'checkout'--move from cart to order
router.put("/checkout", async (req, res, next) => {
  try {
    const currentOrder = await Cart.findAll();
    if (currentOrder) {
      console.log("Your order has been completed!");
      // const newOrder = await Order.create(currentOrder);
      // res.json(newOrder)
    } else {
      console.log("Oops, looks like your cart is empty!");
    }
  } catch (err) {
    next(err);
  }
});

// router.put("/", async (req, res, next) => {
//   try {
//     const { productId } = req.body;
//     // const { orderId } = req.body;

//     const [Cart, created] = await Cart.upsert({
//       productId: productId,
//       // orderId: orderId,
//     });
//     res.json(Cart);
//   } catch (error) {
//     next(error);
//   }
// });

//delete item from cart
router.delete("/:cartId", async (req, res, next) => {
  try {
    const deletedProduct = await await Cart.destroy({
      where: { id: req.params.cartId },
    });
    res.json(deletedProduct);
  } catch (err) {
    next(err);
  }
});
