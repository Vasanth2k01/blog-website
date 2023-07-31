const blogRoute = {
  ADD: "/blog",
  SHOW: "/blog/show",
  SHOWALL: "/blog/show/all",
  GET_BLOG_BY_ID: "/blog/show/:blogId",
  UPDATE_BLOG: "/blog/:blogId",
  DELETE_BLOG: "/blog/:blogId",
};

const healthRoute = {
  HEALTH: "/",
};

const addUser = {
  LOGIN: "/login",
  SIGNUP: "/signup",
};

module.exports = {
  blogRoute,
  healthRoute,
  addUser,
};
