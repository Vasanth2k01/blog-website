// Title Content Author
const { Sequelize } = require("sequelize");
const sequelize = require("../utils/db");
const User = require("../models/User");

const Blog = sequelize.define("blogs", {
  id: {
    type: Sequelize.STRING,
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

Blog.associate = (models) => {
  Blog.belongsTo(models.User, { as: "creator", foreignKey: "author" });
};

async function getAllBlogsWithCreatorEmail() {
  try {
    const blogs = await Blog.findAll({
      attributes: {
        include: [[sequelize.col("creator.email"), "createdByEmail"]],
      },
      include: [{ model: User, as: "creator", attributes: [] }],
    });
    console.log(blogs);
  } catch (error) {
    console.log("Unable to retrieve projects: ", error);
  }
}

sequelize
  .sync()
  .then(() => {
    console.log("blogs table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table blogs: ", error);
  });

module.exports = Blog;
