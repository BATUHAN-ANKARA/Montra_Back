const router = require("express").Router();
const controller = require("../controllers/index");

router.post("/register", controller.userController.register);
router.post("/login", controller.userController.login);
router.get("/getAllUsers", controller.userController.getAllUsers);
router.get("/getUserById/:id", controller.userController.getUserById);
router.put("/updateAvatar/:id", controller.userController.updateAvatar);
router.put("/updatePassword/:id", controller.userController.updatePassword);
router.delete("/deleteUserById/:id", controller.userController.deleteUserById);
router.put("/updateUserById/:id", controller.userController.updateUserById); 
router.put("/updateUserPin/:id", controller.userController.updateUserPin);


module.exports = {
  user: router,
};
