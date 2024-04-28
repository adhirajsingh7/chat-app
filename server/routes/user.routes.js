const router = require("express").Router();
const { user_controller } = require("../controllers");

router
  .route("/")
  .get(user_controller.get_users)
  .post(user_controller.create_user);

router
  .route("/:user_id")
  .get(user_controller.get_user_by_id)
  .put(user_controller.update_user)
  .delete(user_controller.delete_user);

module.exports = router;
