const Blog = require("../models/Blog");

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

      res.status(200).send({ message: "Blog added successfully!" });
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).send({ message: "Failed to create blog." });
    }
  } else {
    res.status(401).send({ message: "Invalid token" });
  }
};

exports.showBlog = async (req, res) => {
  console.log("View blog endpoint hit");
  if (req.user) {
    try {
      const blogs = await Blog.findAll({ where: { userId: req.user.userId } });
      if (blogs.length === 0) {
        return res.status(404).send({ message: "No blogs found." });
      }
      res.status(200).send(blogs);
    } catch {
      console.error("Error fetching blogs :", error);
      res.status(500).send({ message: "Failed to fetch blogs." });
    }
  }
};

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
      res.status(500).send({ message: "Failed to fetch blog." });
    }
  } else {
    res.status(401).send({ message: "Invalid token" });
  }
};

exports.updateBlog = async (req, res) => {
  console.log("Update blog endpoint hit");
  const { blogId } = req.params;
  const { title, content } = req.body;

  if (req.user) {
    try {
      const blog = await Blog.findByPk(blogId);

      if (!blog) {
        return res.status(404).send({ message: "Blog not found." });
      }

      if (blog.author !== req.user.userName) {
        return res
          .status(403)
          .send({ message: "You are not authorized to update this blog." });
      }

      await blog.update({ title, content });

      res.status(200).send({ message: "Blog updated successfully!" });
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).send({ message: "Failed to update blog." });
    }
  } else {
    res.status(401).send({ message: "Invalid token" });
  }
};

exports.deleteBlog = async (req, res) => {
  console.log("Delete blog endpoint hit");
  const { blogId } = req.params;

  if (req.user) {
    try {
      const blog = await Blog.findByPk(blogId);

      if (!blog) {
        return res.status(404).send({ message: "Blog not found." });
      }

      if (blog.author !== req.user.userName) {
        return res
          .status(403)
          .send({ message: "You are not authorized to delete this blog." });
      }

      await blog.destroy();

      res.status(200).send({ message: "Blog deleted successfully!" });
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).send({ message: "Failed to delete blog." });
    }
  } else {
    res.status(401).send({ message: "Invalid token" });
  }
};
