const { Sequelize } = require("sequelize");
const sequelize = require("../utils/db");
const User = require("../models/User");

const Blog = sequelize.define("blogs", {
  blogId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(async () => {
    console.log("blogs table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table blogs: ", error);
  });

module.exports = Blog;
