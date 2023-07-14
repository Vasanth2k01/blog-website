const jwt = require("jsonwebtoken");
const { keys } = require("../config");

exports.Exception = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Route not found/Duplicate entries" });
    }
  };
};

exports.validateEmail = async (req, res, next) => {
  const email = req.body.email;
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) {
    return res.status(400).send({ message: "Invalid email format" });
  }
  next();
};

exports.generateToken = (user) => {
  const secretKey = keys.SECRET_KEY;
  const token = jwt.sign({ id: user.id, userName: user.userName }, secretKey, {
    expiresIn: "1h",
  });
  return token;
};
