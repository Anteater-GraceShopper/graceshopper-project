const router = require('express').Router()
const { Product } = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({})
    res.json(products)
  } catch (err) {
    next(err)
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

router.delete("/:productId", async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId,
      },
    });
    res.json(req.params.productId);
  } catch (error) {
    next(error);
  }
});
