import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducer/store";
import { createBlog } from "../../../reducer/api";
import { Blog } from "../../../reducer/blogSlice";
import { Form, Input, Button, Row, Col, Typography, message } from "antd";
import { ArrowLeftOutlined, EyeOutlined } from "@ant-design/icons";
import MDEditor, { title } from "@uiw/react-md-editor";
import "../Blog.css";
import { useNavigate } from "react-router-dom";
import { blogMessage } from "../../../utils/constants";

const { Title } = Typography;

const NewBlog: React.FC = () => {
  const userName = useSelector((state: RootState) => state.user.data?.userName);
  const token = localStorage.getItem("token");
  const [form] = Form.useForm();
  const [previewMode, setPreviewMode] = useState(false);
  const navigate = useNavigate();

  const onPreview = () => {
    setPreviewMode(true);
  };

  const handleFormValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.title) {
      const uppercaseTitle =
        changedValues.title[0].toUpperCase() +
        changedValues.title.slice(1).toLowerCase();
      form.setFieldsValue({ title: uppercaseTitle });
    }
  };

  const onFinish = async (values: Blog) => {
    try {
      if (!token) {
        console.error("Token is not available.");
        return;
      }

      const newBlog: Blog = {
        blogId: "",
        title: values.title,
        content: values.content,
        author: userName || "",
      };

      await createBlog(newBlog, token);
      message.success(blogMessage.ADD);
    } catch (error) {
      console.error("Failed to create the blog:", error);
    }
  };

  const onPreviewBack = () => {
    setPreviewMode(false);
  };

  return (
    <div>
      <Row justify="start" align="middle" className="header">
        {previewMode ? (
          <Button onClick={onPreviewBack}>Back</Button>
        ) : (
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/blog")}
          >
            Back
          </Button>
        )}
        <Title
          level={3}
          className="title"
          style={{ marginLeft: "30em", color: "white" }}
        >
          {previewMode ? `${form.getFieldValue("title")}` : "Create a New Blog"}
        </Title>
        <div style={{ flex: 1 }} />
        {!previewMode && (
          <Button
            icon={<EyeOutlined />}
            className="preview-button"
            onClick={onPreview}
            style={{ marginRight: "10px" }}
          >
            Preview
          </Button>
        )}
        {!previewMode && (
          <Button
            type="primary"
            htmlType="submit"
            onClick={form.submit}
            style={{
              borderRadius: "8px",
            }}
          >
            Publish
          </Button>
        )}
      </Row>

      <Row justify="center" style={{ paddingTop: "40px" }}>
        <Col span={24}>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            onValuesChange={handleFormValuesChange}
          >
            {!previewMode && (
              <Form.Item
                name="title"
                rules={[{ required: true, message: "Please enter a title." }]}
              >
                <Input
                  size="large"
                  placeholder="Enter the title"
                  className="input-title"
                />
              </Form.Item>
            )}

            <div data-color-mode="light">
              {previewMode ? (
                <div className="preview-content" style={{ textAlign: "left" }}>
                  <MDEditor.Markdown source={form.getFieldValue("content")} />
                </div>
              ) : (
                <Form.Item
                  name="content"
                  rules={[
                    { required: true, message: "Please enter the content." },
                  ]}
                >
                  <MDEditor
                    value={form.getFieldValue("content")}
                    style={{
                      height: "400px",
                      borderRadius: "8px",
                    }}
                    onChange={(value) =>
                      form.setFieldsValue({ content: value })
                    }
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

export default NewBlog;
