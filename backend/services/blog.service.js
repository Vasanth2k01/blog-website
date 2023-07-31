const Blog = require("../models/Blog");
const { blogMessage } = require("../utils/constants");

// Route to add blog
exports.addBlog = async (req, res) => {
  console.log("Create blog endpoint hit");
  const { title, content } = req.body;

  if (req.user) {
    const userId = req.user.userId;
    const author = req.user.userName;

    try {
      await Blog.create({
        userId,
        title,
        content,
        author,
      });

      res.status(200).send({ message: blogMessage.ADD });
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).send({ message: blogMessage.ADDFAIL });
    }
  } else {
    res.status(401).send({ message: blogMessage.token.INVALID });
  }
};

// Route to show all blog
exports.showBlog = async (req, res) => {
  console.log("View blog endpoint hit");
  if (req.user) {
    try {
      const blogs = await Blog.findAll({ where: { userId: req.user.userId } });
      if (blogs.length === 0) {
        return res.status(404).send({ message: blogMessage.NOBLOG });
      }
      res.status(200).send(blogs);
    } catch {
      console.error("Error fetching blogs :", error);
      res.status(500).send({ message: blogMessage.FETCHFAIL });
    }
  }
};

exports.showAllBlog = async (req, res) => {
  console.log("View All blog endpoint hit");
  try {
    const blogs = await Blog.findAll();
    if (blogs.length === 0) {
      return res.status(404).send({ message: blogMessage.NOBLOG });
    }
    res.status(200).send(blogs);
  } catch {
    console.error("Error fetching blogs :", error);
    res.status(500).send({ message: blogMessage.FETCHFAIL });
  }
};

// Route to get blog by id
exports.getBlogById = async (req, res) => {
  console.log("View blog by id endpoint hit");

  if (req.user) {
    try {
      const blog = await Blog.findByPk(req.params.blogId);
      if (!blog) {
        return res.status(404).send({ message: "Blog not found." });
      }
      res.status(200).send(blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).send({ message: blogMessage.FETCHFAIL });
    }
  } else {
    res.status(401).send({ message: blogMessage.token.INVALID });
  }
};

// Route to update blog
exports.updateBlog = async (req, res) => {
  console.log("Update blog endpoint hit");
  const { blogId } = req.params;
  const { title, content } = req.body;

  if (req.user) {
    try {
      const blog = await Blog.findByPk(blogId);

      if (!blog) {
        return res.status(404).send({ message: blogMessage.NOTFOUND });
      }

      if (blog.author !== req.user.userName) {
        return res
          .status(403)
          .send({ message: blogMessage.token.NOTAUTHORIZED });
      }

      await blog.update({ title, content });

      res.status(200).send({ message: blogMessage.UPDATE });
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).send({ message: blogMessage.UPDATEFAIL });
    }
  } else {
    res.status(401).send({ message: blogMessage.token.INVALID });
  }
};

// Route to delete blog
exports.deleteBlog = async (req, res) => {
  console.log("Delete blog endpoint hit");
  const { blogId } = req.params;

  if (req.user) {
    try {
      const blog = await Blog.findByPk(blogId);

      if (!blog) {
        return res.status(404).send({ message: blogMessage.NOTFOUND });
      }

      if (blog.author !== req.user.userName) {
        return res
          .status(403)
          .send({ message: blogMessage.token.NOTAUTHORIZED });
      }

      await blog.destroy();

      res.status(200).send({ message: blogMessage.DELETE });
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).send({ message: blogMessage.DELETEFAIL });
    }
  } else {
    res.status(401).send({ message: blogMessage.token.INVALID });
  }
};
