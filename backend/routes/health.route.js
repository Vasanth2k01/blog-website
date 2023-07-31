const express = require("express");
const { health } = require("../services/health.service");
const { healthRoute } = require("../utils/routes");
const router = express.Router();

router.get(healthRoute.HEALTH, health);

module.exports = router;
