const { Sequelize } = require("sequelize");
const { keys } = require("../config");

const sequelize = new Sequelize(
  keys.MYSQL_DATABASE,
  keys.MYSQL_USER,
  keys.MYSQL_PASSWORD,
  {
    host: keys.MYSQL_HOST,
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
    },
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.query("CREATE DATABASE IF NOT EXISTS BLOG_users;");
  })
  .then(() => {
    console.log("Database created or already exists.");
  })
  .catch((error) => {
    console.error("Unable to create the database: ", error);
  });

module.exports = sequelize;
