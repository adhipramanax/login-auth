const model = require("../../models");

const User = model.user;
const bcrypt = require("bcryptjs");
const config = require("../../config/config");

const salt = config.jwt.salt;

// add user
async function addUser(req, res) {
  // #swagger.description = 'This endpoint allows you to add a new user. You must be logged in as an superadmin to access this endpoint'
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password + salt, 12),
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
      error,
    });
  }
}

// update user
async function updateUser(req, res) {
  // #swagger.description = 'This endpoint allows you to update a user. You must be logged in as an superadmin to access this endpoint'
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      await user.update({
        name,
        email,
        password: await bcrypt.hash(password + salt, 12),
      });
      res.status(200).json({
        message: "User updated successfully",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
      error,
    });
  }
}

// delete user
async function deleteUser(req, res) {
  // #swagger.description = 'This endpoint allows you to delete a user. You must be logged in as an superadmin to access this endpoint'
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      await user.destroy();
      res.status(200).json({
        message: "User deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
      error,
    });
  }
}

// get all users
async function getAllUser(req, res) {
  // #swagger.description = 'This endpoint allows you to get all users. You need to be logged in as an admin to access this endpoint'
  try {
    const users = await User.findAll();
    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
      error,
    });
  }
}

// find one
async function getUser(req, res) {
  // #swagger.description = 'This endpoint allows you to get a user. You need to be logged in as an admin to access this endpoint'
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.status(200).json({
        message: "User retrieved successfully",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
      error,
    });
  }
}

// register user
async function registerUser(req, res) {
  // #swagger.description = 'This endpoint allows you to register a user. You dont need to be logged in to access this endpoint'
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password + salt, 12),
      role: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured",
      error,
    });
  }
}

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUser,
  registerUser,
};
