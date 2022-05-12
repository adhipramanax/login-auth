const jwt = require("jsonwebtoken");
const config = require("../config/config");

const superAdminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (authHeader) {
      const token = authHeader.split("Bearer ")[1];
      const secretKey = config.jwt.jwtKey;

      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          res.status(401).json({
            message: "You are not authorized to access this resource",
          });
        } else {
          if (decoded.role <= 0) {
            req.user = decoded;
            next();
          } else {
            res.status(401).json({
              message: "You are not authorized to access this resource",
            });
          }
        }
      });
    } else {
      res.status(401).json({
        message: "You are not authorized to access this resource",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (authHeader) {
      const token = authHeader.split("Bearer ")[1];
      const secretKey = config.jwt.jwtKey;

      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          res.status(401).json({
            message: "You are not authorized to access this resource",
          });
        } else {
          if (decoded.role <= 1) {
            req.user = decoded;
            next();
          } else {
            res.status(401).json({
              message: "You are not authorized to access this resource",
            });
          }
        }
      });
    } else {
      res.status(401).json({
        message: "You are not authorized to access this resource",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const authorization = (level) => {
  switch (level) {
    case 0:
      return superAdminAuth;
    case 1:
      return adminAuth;
    default:
      return null;
  }
};

module.exports = {
  superAdminAuth,
  authorization,
};
