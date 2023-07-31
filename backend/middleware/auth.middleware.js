const jwt = require("jsonwebtoken");
const { keys } = require("../config");

exports.Exception = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: authMessage.DUPLICATE });
    }
  };
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
      return res.status(401).send({ message: blogMessage.token.INVALID });
    }
  } else {
    return res.status(401).send({ message: blogMessage.token.NOTOKEN });
  }

  next();
};
