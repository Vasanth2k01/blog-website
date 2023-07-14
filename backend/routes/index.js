const express = require("express");
const router = express.Router();

const healthRoute = require("./health.route");
const userRoutes = require("./user.route");
router.use(healthRoute, userRoutes);

module.exports = router;
