require("dotenv").config({
  path: "/home/calibraint/Documents/Blog-website/blog-website/backend/utils/.env",
});

exports.keys = {
  PORT: process.env.PORT,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  SECRET_KEY: process.env.SECRET_KEY,
};
