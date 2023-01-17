const router = require("express").Router();

const { Cart, Product } = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({ include: Product });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.put("/checkout", async (req, res, next) => {
  try {
    const currentOrder = await Cart.findAll();
    if (currentOrder) {
      console.log("Your order has been completed!");
    } else {
      console.log("Oops, looks like your cart is empty!");
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:productId", async (req, res, next) => {
  try {
    const deletedProduct = await Cart.destroy({
      where: { productId: req.params.productId },
    });
    res.json(deletedProduct);
  } catch (err) {
    next(err);
  }
});
