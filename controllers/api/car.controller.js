const model = require("../../models");
const config = require("../../config/config");

const Car = model.car;

// add car
async function addCar(req, res) {
  // #swagger.description = 'This endpoint allows you to add a new car to the database. It requires the following parameters: name, price, url_image, year, transmission. It returns the car added. Log in as an admin to add a car.'
  try {
    const { name, price, url_image, year, transmission } = req.body;

    const car = await Car.create({
      name,
      price,
      url_image,
      year,
      transmission,
      created_by: req.user.id,
      updated_by: req.user.id,
      deleted_by: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({
      message: "Car created successfully",
      data: car,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
      error,
    });
  }
}

// update car
async function updateCar(req, res) {
  // #swagger.description = 'This endpoint allows you to update a car. It requires the following parameters: name, price, url_image, year, transmission. It returns the car updated. Log in as an admin to update a car.'
  try {
    const { id } = req.params;
    const { name, price, url_image, year, transmission } = req.body;
    const car = await Car.findByPk(id);
    if (!car) {
      res.status(404).json({
        message: "Car not found",
      });
    } else {
      await car.update({
        name,
        url_image,
        price,
        year,
        transmission,
        updated_by: req.user.id,
        deleted_by: null,
      });
      res.status(200).json({
        message: "Car updated successfully",
        data: car,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
      error,
    });
  }
}

// delete car
async function deleteCar(req, res) {
  // #swagger.description = 'This endpoint allows you to delete a car. Log in as an admin to delete a car.'
  try {
    const { id } = req.params;
    const car = await Car.findByPk(id);
    if (!car) {
      res.status(404).json({
        message: "Car not found",
      });
    } else {
      await car.update({
        deleted_by: req.user.id,
      });

      res.status(200).json({
        message: "Car deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
      error,
    });
  }
}

// get all car
async function getAllCar(req, res) {
  // #swagger.description = 'This endpoint allows you to get all cars. Log in as an member to get all cars.'
  try {
    const car = await Car.findAll({
      where: {
        deleted_by: null,
      },
    });
    res.status(200).json({
      message: "Cars found successfully",
      data: car,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
      error,
    });
  }
}

// get car
async function getCar(req, res) {
  // #swagger.description = 'This endpoint allows you to get a car. Log in as an member to get a car.'
  try {
    const { id } = req.params;
    const car = await Car.findOne({
      where: {
        id,
        deleted_by: null,
      },
    });
    if (!car) {
      res.status(404).json({
        message: "Car not found",
      });
    } else {
      res.status(200).json({
        message: "Car found successfully",
        data: car,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
      error,
    });
  }
}

module.exports = {
  addCar,
  updateCar,
  deleteCar,
  getAllCar,
  getCar,
};
