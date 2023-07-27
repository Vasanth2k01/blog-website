import React, { useEffect, useState } from "react";
import { Blog } from "../../reducer/blogSlice";
import { deleteBlog, getBlog } from "../../reducer/api";
import { useNavigate } from "react-router-dom";
import "./Blog.css";
import { Alert, Form, Modal, Space, Spin, message } from "antd";

const BlogComp: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [viewContentPage, setViewContentPage] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlog();
        setBlogs(response);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, [token]);

  const handleEdit = (blogId: string, content: string) => {
    navigate(`/blog/edit/${blogId}`, { state: { content } });
  };

  const handleDelete = (blogId: any) => {
    const token: string = localStorage.getItem("token") ?? "";

    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this blog?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        try {
          deleteBlog(blogId, token);
          setBlogs(
            (prevBlogs) =>
              prevBlogs?.filter((blog) => blog.blogId !== blogId) ?? null
          );
        } catch (error) {
          console.error("Failed to delete blog:", error);
          message.error("Failed to delete blog");
        }
      },
    });
  };

  const getFirstLetter = (title: string) => {
    return title.charAt(0).toUpperCase();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredBlogs = blogs
    ? blogs.filter((blog: Blog) =>
        blog.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const viewBlog = (blogId: string) => {
    setViewContentPage(true);
    navigate(`/blog/edit/${blogId}?viewContentPage=true`);
  };

  return (
    <div>
      <header className="header">
        <h1 style={{ color: "#fff", margin: "0", padding: "0" }}>
          CALIB BLOGGER
        </h1>
        <button onClick={logout} className="logout-button">
          Log out
        </button>
      </header>

      <div
        style={{ display: "flex", alignItems: "flex-start", padding: "20px" }}
      >
        <div style={{ flex: "0 0 200px", marginRight: "20px" }}>
          <button
            className="button-style"
            onClick={() => {
              navigate("/blog/new");
            }}
            style={{ cursor: "pointer" }}
          >
            New Blog
          </button>
          {filteredBlogs.length > 0 && (
            <h3 style={{ color: "#848484" }}>All ({filteredBlogs.length})</h3>
          )}
        </div>
        <div style={{ flex: "1", flexWrap: "wrap" }}>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog: Blog) => (
              <div key={blog.blogId} className="blog-item">
                <div className="avatar">{getFirstLetter(blog.title)}</div>
                <div className="blog-title">
                  <h3 onClick={() => viewBlog(blog?.blogId)}>{blog.title}</h3>
                </div>
                <div>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(blog.blogId, blog.content)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(blog.blogId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div> No blogs found. </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <input
            type="text"
            placeholder="Search for blogs"
            value={searchValue}
            onChange={handleSearchChange}
            className="input-style"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogComp;
