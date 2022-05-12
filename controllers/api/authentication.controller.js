const model = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const User = model.user;
const salt = config.jwt.salt;

async function authUser(req, res) {
  try {
    const body = req.body;

    if (body.email !== "" && body.password !== "") {
      // Find User
      const user = await User.findOne({
        where: {
          email: body.email,
        },
      });

      // Match password
      const matchPass = await bcrypt.compare(
        body.password + salt,
        user.password
      );

      if (!matchPass) {
        return res.status(401).json({
          message: "username/password invalid!",
        });
      }

      //Generate
      const secretKey = config.jwt.jwtKey;
      const expireKey = "2h";

      const tokenAccess = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        secretKey,
        {
          algorithm: "HS256",
          expiresIn: expireKey,
        }
      );

      return res.status(200).json({
        message: "Success!",
        token: "Bearer " + tokenAccess,
      });
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
}

module.exports = {
  authUser,
};
