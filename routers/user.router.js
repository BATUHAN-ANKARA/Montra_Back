const router = require("express").Router();
const controller = require("../controllers/index");

router.post("/register", controller.userController.register);
router.post("/login", controller.userController.login);
router.get("/getAllUsers", controller.userController.getAllUsers);
router.put("/updateAvatar", controller.userController.updateAvatar);
router.get("/getUserById", controller.userController.getUserById);
router.put("/updateUserById", controller.userController.updateUserById);
router.put("/updatePassword", controller.userController.updatePassword);

module.exports = {
  user: router,
};
