import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { signupUserAsync } from "../../reducer/userSlice";
import { AppDispatch, RootState } from "../../reducer/store";
import { validatePassword } from "../../utils/auth.helper";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";

const FormComp: React.FC = () => {
  const signup = useSelector((state: RootState) => state.user.signupStatus);
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();

  const formContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const onFinish = (values: any) => {
    const { userName, email, password, organisation } = values;
    dispatch(signupUserAsync({ userName, email, password, organisation }));
  };

  useEffect(() => {
    if (signup === true) {
      form.resetFields();
      navigate(routes.LOGIN);
    }
  }, [signup]);

  const onFinishFailed = (errorInfo: any) => {
    return errorInfo;
  };

  return (
    <div style={formContainer}>
      <Form
        form={form}
        name="basic"
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
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              type: "email",
              message: "Invalid email format!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, validator: validatePassword }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Organisation"
          name="organisation"
          rules={[
            {
              required: true,
              message: "Please input your organisation!",
              max: 255,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#8C8787" }}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormComp;
