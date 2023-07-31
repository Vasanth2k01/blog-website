const { authMessage } = require("./constants");

exports.validateEmail = async (req, res, next) => {
  const email = req.body.email;
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) {
    return res.status(400).send({ message: authMessage.INVALIDEMAIL });
  }
  next();
};
