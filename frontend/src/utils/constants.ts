export const BASE_URL = "http://localhost:4200/api";

export enum showMessage {
  SIGNUP = "Signup successfully",
  LOGIN = "Login successfully",
  ERROR = "Invalid credentials!",
  EMAIL = "Email already in use!",
}

export enum blogMessage {
  ADD = "Blog added successfully!",
  UPDATE = "Blog updated successfully!",
  DELETE = "Blog deleted successfully!",
  ERROR = "Failed to retrieve blogs!",
}

export const emailPattern = {
  PATTERN: /(?=.*[!@#$%^&*])(?=.*[A-Z])/,
  NOTIFY: "Enter a valid password eg: Test@12!",
};
