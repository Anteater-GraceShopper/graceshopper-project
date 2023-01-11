const router = require('express').Router()
const { current } = require('@reduxjs/toolkit');
const { Cart, Product, User } = require('../db');
const Order = require('../db/models/Order');
module.exports = router

//view the entire cart
router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findAll()
    res.json(cart)
  } catch (err) {
    next(err)
  }
});

//how do we determine if the user is logged in or not?

//update the product amount
router.put('/', async (req, res, next) => {
  try {
    const product = await Cart.findByPk(req.params.productId)
    res.send(await Cart.update(product));
  } catch (err) {
    next(err)
  }
});

//'checkout'--move from cart to order
router.put('/checkout', async (req, res, next) => {
  try {
    const currentOrder = await Cart.findAll();
    if (currentOrder) {
      console.log("Your order has been completed!")
      // const newOrder = await Order.create(currentOrder);
      // res.json(newOrder)
    } else {
      console.log('Oops, looks like your cart is empty!')
    }
  } catch (err) {
    next(err)
  }
});

//delete item from cart
router.delete('/:productId', async (req, res, next) => {
  try {
    const deletedProduct = await Cart.findByPk(req.params.productId);
    await deletedProduct.destroy();
    res.send(req.params.productId)
  } catch (err) {
    next(err)
  }
});
