const express = require("express");
const {
  addBlog,
  updateBlog,
  deleteBlog,
  showBlog,
  getBlogById,
  showAllBlog,
} = require("../services/blog.service");
const {
  Exception,
  authenticateUser,
} = require("../middleware/auth.middleware");
const { blogRoute } = require("../utils/routes");
const router = express.Router();

router.post(blogRoute.ADD, authenticateUser, Exception(addBlog));
router.get(blogRoute.SHOW, authenticateUser, Exception(showBlog));
router.get(blogRoute.SHOWALL, Exception(showAllBlog));
router.get(blogRoute.GET_BLOG_BY_ID, authenticateUser, Exception(getBlogById));
router.put(blogRoute.UPDATE_BLOG, authenticateUser, updateBlog);
router.delete(blogRoute.DELETE_BLOG, authenticateUser, deleteBlog);

module.exports = router;
