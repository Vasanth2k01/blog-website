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
  const token = jwt.sign(
    { userId: user.userId, userName: user.userName },
    secretKey,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

exports.authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, keys.SECRET_KEY);
      req.user = decoded;
    } catch (error) {
      return res.status(401).send({ message: "Invalid token" });
    }
  } else {
    return res.status(401).send({ message: "No token provided" });
  }

  next();
};
