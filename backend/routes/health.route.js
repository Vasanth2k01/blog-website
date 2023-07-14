const express = require("express");
const { health } = require("../services/health.service");
const router = express.Router();

router.get("/", health);

module.exports = router;
