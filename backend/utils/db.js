const { Sequelize } = require("sequelize");
const { keys } = require("../config");
const { dbMessage } = require("./constants");

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
    console.log(dbMessage.ESTABLISH_CONNECTION);
    return sequelize.query(dbMessage.CREATE);
  })
  .then(() => {
    console.log(dbMessage.ALREADY_EXIST);
  })
  .catch((error) => {
    console.error(dbMessage.FAIL, error);
  });

module.exports = sequelize;
