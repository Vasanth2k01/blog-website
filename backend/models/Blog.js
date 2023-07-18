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
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

async function getAllBlogsWithCreatorEmail() {
  try {
    const blogs = await Blog.findAll({
      include: [{ model: User, as: "creator", attributes: ["email"] }],
    });
    // console.log(blogs);
  } catch (error) {
    console.log("Unable to retrieve blogs: ", error);
  }
}

sequelize
  .sync()
  .then(async () => {
    console.log("blogs table created successfully!");
    // await getAllBlogsWithCreatorEmail();
  })
  .catch((error) => {
    console.error("Unable to create table blogs: ", error);
  });

module.exports = Blog;
