const { Sequelize } = require("sequelize");
const sequelize = require("../utils/db");
const User = require("../models/User");
const { blogMessage } = require("../utils/constants");

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
    console.log(blogMessage.model.blog.CREATEBLOG);
  })
  .catch((error) => {
    console.error(blogMessage.model.FAIL, error);
  });

module.exports = Blog;
