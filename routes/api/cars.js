var express = require("express");
var router = express.Router();

const {
  addCar,
  updateCar,
  deleteCar,
  getAllCar,
  getCar,
} = require("../../controllers/api/car.controller");

const { authorization } = require("../../middlewares/roleAuthentication");

// add car
router.post("/addcar", authorization(1), addCar);
// update car
router.put("/updatecar/:id", authorization(1), updateCar);
// delete car
router.delete("/deletecar/:id", authorization(1), deleteCar);
// get all car
router.get("/car", getAllCar);
// get car
router.get("/car/:id", getCar);

module.exports = router;
