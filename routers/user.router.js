const router = require("express").Router();
const controller = require("../controllers/index");

router.post("/register", controller.userController.register);
router.get("/getAllUsers", controller.userController.getAllUsers);
router.post("/login", controller.userController.login);

module.exports = {
  user: router,
};
