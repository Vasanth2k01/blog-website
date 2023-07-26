import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Blog } from "./blogSlice";
import { message } from "antd";

const BASE_URL = "http://localhost:4200/api";

export const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:4002/api",
});

export const signupUser = async (userData: any) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Signup failed.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An error occurred.");
    }
  }
};

export const login = async (
  userData: {
    userName: string;
    password: string;
  },
  instance: AxiosInstance
) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Login failed.");
    }

    const data = await response.json();
    const token = data?.token;

    if (token) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      throw new Error("Token not found in response.");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An error occurred.");
    }
  }
};

export const getBlog = async () => {
  try {
    const token = localStorage.token;
    if (!token) {
      throw new Error("Token not found in local storage.");
    }

    const response = await fetch(`${BASE_URL}/blog/show`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get blogs.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("An error occurred while getting blogs.");
  }
};

export const createBlog = async (
  blogData: Blog,
  token: string
): Promise<AxiosResponse<Blog>> => {
  try {
    const response = await axios.post(`${BASE_URL}/blog`, blogData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("An error occurred while creating the blog.");
  }
};

export const deleteBlog = async (blogId: string, token: string) => {
  try {
    await axios.delete(`${BASE_URL}/blog/${blogId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    message.success("Blog deleted successfully!");
  } catch (error) {
    console.error("Failed to delete blog:", error);
    throw new Error("Failed to delete blog");
  }
};

export const updateBlog = async (
  blogId: string,
  blogData: Blog,
  token: string
) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.put(`${BASE_URL}/blog/${blogId}`, blogData, {
      headers,
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to update blog");
  }
};

export const getBlogById = async (
  blogId: string | undefined,
  token: string | null
): Promise<Blog> => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get<Blog>(`${BASE_URL}/blog/show/${blogId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch the blog.");
  }
};
