const express = require("express");
const { addBlog, updateBlog, deleteBlog } = require("../services/blog.service");
const {
  Exception,
  authenticateUser,
} = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/blog", authenticateUser, Exception(addBlog));
router.put("/blog/:blogId", authenticateUser, updateBlog);
router.delete("/blog/:blogId", authenticateUser, deleteBlog);

module.exports = router;
