// health route
exports.health = (req, res) => {
  res.send({ status: "Application working successfully!" });
};
