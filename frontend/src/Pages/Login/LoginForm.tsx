import React from "react";
import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "../../reducer/userSlice";
import { AppDispatch } from "../../reducer/store";
import { useNavigate } from "react-router-dom";
import { instance } from "../../reducer/api";
import { routes } from "../../utils/routes";

const LoginForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigate();

  const onFinish = async (values: any) => {
    const { userName, password } = values;
    await dispatch(loginUserAsync({ userName, password }, instance));
    navigation(routes.blog.BLOG);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="userName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          style={{}}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#8C8787" }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
