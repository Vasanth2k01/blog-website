const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/auth.middleware");
const Blog = require("../models/Blog");

// Route function for creating a user
exports.createUser = async (req, res) => {
  console.log("Create user endpoint hit");
  const { userName, email, password, organisation } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({
        message: "Email already in use. Please use a different email address!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      userName,
      email,
      password: hashedPassword,
      organisation,
    });
    res.status(200).send({ message: "User added successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Failed to create user." });
  }
};

exports.loginUser = async (req, res) => {
  console.log("Login user endpoint hit");
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return res.status(404).send("Please sign up to continue!");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send("Invalid password!");
    }

    const token = generateToken(user);

    // Set user's name as the author in the blogs
    const loggedInUserName = user.userName;
    await Blog.update({ author: loggedInUserName }, { where: {} });

    res.send({
      token,
      message: `User login successfully! Welcome ${userName}!`,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send({ message: "Failed to login." });
  }
};
