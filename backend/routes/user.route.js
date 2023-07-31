const express = require("express");
const { createUser, loginUser } = require("../services/user.service");
const { Exception } = require("../middleware/auth.middleware");
const { validateEmail } = require("../utils/auth.helper");
const { addUser } = require("../utils/routes");
const router = express.Router();

router.post(addUser.SIGNUP, validateEmail, Exception(createUser));
router.post(addUser.LOGIN, loginUser);

module.exports = router;
