const { Sequelize } = require("sequelize");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sequelize = require("../utils/db");

const User = sequelize.define(
  "users",
  {
    userId: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    organisation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeValidate: (user) => {
        if (!user.userId) {
          const randomBytes = crypto.randomBytes(6);
          user.userId = randomBytes.toString("hex");
        }
      },
    },
  }
);

User.prototype.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

// Sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("users table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = User;
