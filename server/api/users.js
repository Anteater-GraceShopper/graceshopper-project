const router = require("express").Router();
const { User } = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username", "isAdmin", "first", "last"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    res.json(await User.findByPk(req.params.userId));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.send(await User.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.send(await user.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId,
      },
    });
    res.json(req.params.userId);
  } catch (error) {
    next(error);
  }
});
