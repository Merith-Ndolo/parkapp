const router = require("express").Router();
const authController = require("../controllers/auth_controller");
const userController = require("../controllers/user_controller");

//log
router.post("/loginadmin", authController.signInAdmin);
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
router.get("/activate/:token", authController.activateHandle);
router.post("/forgot", authController.forgotPassword);
router.post("/reset/:id", authController.resetPassword);
router.get("/forgot/:token", authController.gotoReset);

//users management
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);

module.exports = router;
