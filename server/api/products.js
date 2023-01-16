const router = require("express").Router();
const { Product } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    console.log("products", Object.keys(Product.prototype));
    const allProducts = await Product.findAll();
    res.json(allProducts);
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    res.json(await Product.findByPk(req.params.productId));
  } catch (err) {
    next(err);
  }
});

router.put("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.send(await product.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    next(err);
  }
});

// router.delete("/:productId", async (req, res, next) => {
//   try {
//     await Product.destroy({
//       where: {
//         id: req.params.productId,
//       },
//     });
//     res.json(req.params.productId);
//   } catch (error) {
//     next(error);
//   }
// });

router.delete("/:productId", async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByPk(req.params.productId);
    if (deletedProduct) {
      await deletedProduct.destroy();
      res.json(deletedProduct);
    } else {
      console.log("nothing to be deleted");
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
