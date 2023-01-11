const router = require("express").Router();
const { Order } = require("../db");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    res.send(await Order.create(req.body));
  } catch (err) {
    next(err);
  }
});
