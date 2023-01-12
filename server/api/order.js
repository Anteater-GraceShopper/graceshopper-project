const router = require("express").Router();
const { Order, User } = require("../db");
module.exports = router;

router.put("/:productId/:userId", async (req, res, next) => {
  const product = await Product.findByPk(req.params.productId);
  const user = await User.findByPk(req.params.userId, {
    include: Order,
    where: {
      isComplete: false,
    },
  });
  const order = user.orders[0];
  const newProduct = await order;
});
