const express = require("express");
const {
  addBlog,
  updateBlog,
  deleteBlog,
  showBlog,
  getBlogById,
} = require("../services/blog.service");
const {
  Exception,
  authenticateUser,
} = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/blog", authenticateUser, Exception(addBlog));
router.get("/blog/show", authenticateUser, Exception(showBlog));
router.get("/blog/show/:blogId", authenticateUser, Exception(getBlogById));
router.put("/blog/:blogId", authenticateUser, updateBlog);
router.delete("/blog/:blogId", authenticateUser, deleteBlog);

module.exports = router;
