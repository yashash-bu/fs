const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

//localhost:3000
router.route("/").get(userController.getAllUser).post(userController.createUser);

//localhost:3000/:id
router.route("/:id").get(userController.getOneUser).patch(userController.updateUser).delete(userController.deleteUser);

router.route("/login").post(userController.loginUser);

module.exports = router;