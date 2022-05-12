const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (authHeader) {
      const token = authHeader.split("Bearer ")[0];
      const secretKey = process.env.JWT_SECRET_KEY;

      jwt.verify(token, secretKey, (error, user) => {
        if (error) {
          return res.status(403).json({
            message: error.message,
          });
        }

        req.user = user;
        next();
      });
    } else {
      res.sendStatus("401");
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = authJWT;
