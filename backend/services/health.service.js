const { healthMessage } = require("../utils/constants");

// health route
exports.health = (req, res) => {
  res.send({ status: healthMessage.WORKING });
};
