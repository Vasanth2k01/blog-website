const express = require("express");
const router = express.Router();

const healthRoute = require("./health.route");
const userRoutes = require("./user.route");
const blogRoutes = require("./blog.route");

router.use(healthRoute, userRoutes, blogRoutes);

module.exports = router;
