var express = require("express");
var router = express.Router();

const {
  addUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUser,
  registerUser,
} = require("../../controllers/api/user.controller");

const { authorization } = require("../../middlewares/roleAuthentication");

// add user
router.post("/adduser", authorization(0), addUser);
// update user
router.put("/updateuser/:id", authorization(0), updateUser);
// delete user
router.delete("/deleteuser/:id", authorization(0), deleteUser);
// get all user
router.get("/user", authorization(1), getAllUser);
// get user
router.get("/user/:id", authorization(1), getUser);
// register user
router.post("/register", registerUser);

module.exports = router;
