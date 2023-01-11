const router = require('express').Router()
const { Cart, Product, User } = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findAll()
    res.json(cart)
  } catch (err) {
    next(err)
  }
});

router.put('/', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.send(await Cart.update(product));
  } catch (err) {
    next(err)
  }
})
