const router = require("express").Router();
const controller = require("../controllers/index");

router.post("/register", controller.userController.register);
router.get("/getUserByEmail/:email", controller.userController.getUserByEmail);
router.get("/getUserByName/:name", controller.userController.getUserByName);
router.get("/getUserBySurname/:surname", controller.userController.getUserBySurname);
router.get("/getUserByAge/:age", controller.userController.getUserByAge);
router.get("/getUserByGender/:gender", controller.userController.getUserByGender);

module.exports = {
  user: router,
};
