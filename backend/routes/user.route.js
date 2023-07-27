const express = require("express");
const { createUser, loginUser } = require("../services/user.service");
const { Exception, validateEmail } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/signup", validateEmail, Exception(createUser));
router.post("/login", loginUser);

module.exports = router;
