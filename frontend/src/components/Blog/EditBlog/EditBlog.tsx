import React, { useEffect, useState } from "react";
import { Blog } from "../../../reducer/blogSlice";
import { getBlogById, updateBlog } from "../../../reducer/api";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Button, Row, Col, Typography, message } from "antd";
import MDEditor from "@uiw/react-md-editor";
import "../../Blog/Blog.css";
import "../../Blog/EditBlog/EditBlog.css";
import { blogMessage } from "../../../utils/constants";

const { Title } = Typography;

const EditBlog: React.FC = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [form] = Form.useForm();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const viewContentPage = queryParams.get("viewContentPage") === "true";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlogById(blogId, token);
        setBlog(blogData);
        form.setFieldsValue({
          title: blogData?.title,
          content: blogData?.content,
        });
      } catch (error) {
        console.error("Failed to fetch the blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const onFinish = async (values: Blog) => {
    try {
      if (!token) {
        console.error("Token is not available.");
        return;
      }

      if (blogId) {
        const updatedBlog: Blog = {
          ...blog!,
          title: values.title,
          content: values.content,
        };

        await updateBlog(blogId, updatedBlog, token);
        message.success(blogMessage.UPDATE);
        navigate("/blog");
      }
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };

  const handleFormValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.title) {
      const uppercaseTitle =
        changedValues.title[0].toUpperCase() +
        changedValues.title.slice(1).toLowerCase();
      form.setFieldsValue({ title: uppercaseTitle });
    }
  };

  return (
    <div className="edit-blog-container">
      <Row justify="start" align="middle" className="header">
        <Button onClick={() => navigate("/blog")}>Back</Button>
        <h1 className="content-title" style={{ marginLeft: "23em" }}>
          {blog?.title}
        </h1>

        <div style={{ flex: 1 }} />
        {!viewContentPage && (
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => form.submit()}
          >
            Update
          </Button>
        )}
      </Row>
      <Row justify="center" className="content-row">
        <Col span={24}>
          <Form
            form={form}
            layout="vertical"
            initialValues={blog || {}}
            onFinish={onFinish}
            onValuesChange={handleFormValuesChange}
          >
            {!viewContentPage && (
              <Form.Item
                name="title"
                rules={[{ required: false, message: "Please enter a title." }]}
              >
                <Input
                  size="large"
                  className="input-title"
                  style={{ marginLeft: "15px" }}
                />
              </Form.Item>
            )}

            <div data-color-mode="light" className="show-content">
              {viewContentPage ? (
                <div className="view-content">
                  <MDEditor.Markdown source={blog?.content} />
                  <div className="author-section">
                    <h3>Autor: {blog?.author}</h3>
                  </div>
                </div>
              ) : (
                <Form.Item
                  name="content"
                  rules={[
                    { required: true, message: "Please enter the content." },
                  ]}
                >
                  <MDEditor
                    className="editor"
                    style={{ height: "400px", borderRadius: "8px" }}
                  />
                </Form.Item>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default EditBlog;
