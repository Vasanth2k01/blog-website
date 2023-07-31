const blogMessage = {
  model: {
    blog: {
      CREATEBLOG: "blogs table created successfully!",
      FAIL: "Unable to create table blogs: ",
    },
  },
  ADD: "Blog added successfully!",
  UPDATE: "Blog updated successfully!",
  DELETE: "Blog deleted successfully!",
  ADDFAIL: "Failed to create blog.",
  UPDATEFAIL: "Failed to update blog.",
  DELETEFAIL: "Failed to delete blog.",
  NOBLOG: "No blogs found.",
  FETCHFAIL: "Failed to fetch blogs.",
  NOTFOUND: "Blog not found.",
  token: {
    NOTAUTHORIZED: "You are not authorized to update this blog.",
    INVALID: "Invalid token",
    NOTOKEN: "No token provided",
  },
};
const userMessage = {
  model: {
    user: {
      CREATE: "users table created successfully!",
      FAIL: "Unable to create table : ",
    },
  },
  EMAILERROR: "Email already in use. Please use a different email address!",
  ADDUSER: "User added successfully!",
  ADDFAIL: "Failed to create user.",
  SIGNUP: "Please sign up to continue!",
  INVALID_PASSWORD: "Invalid password!",
  LOGIN_SUCCESSFULL: "User login successfully! Welcome",
  LOGIN_FAIL: "Failed to login.",
};

const healthMessage = {
  WORKING: "Application working successfully!",
};

const authMessage = {
  DUPLICATE: "Route not found/Duplicate entries",
  INVALIDEMAIL: "Invalid email format",
};

const dbMessage = {
  CREATE: "CREATE DATABASE IF NOT EXISTS BLOG_users;",
  FAIL: "Unable to create the database: ",
  ESTABLISH_CONNECTION: "Connection has been established successfully.",
  ALREADY_EXIST: "Database created or already exists.",
};

module.exports = {
  blogMessage,
  userMessage,
  authMessage,
  dbMessage,
  healthMessage,
};
