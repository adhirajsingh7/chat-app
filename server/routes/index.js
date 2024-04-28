const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to chat app" });
});

router.use("/users", require("./user.routes"));

module.exports = router;
