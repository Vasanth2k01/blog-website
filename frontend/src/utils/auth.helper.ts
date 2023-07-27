import { emailPattern } from "./constants";

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) {
    return false;
  }

  try {
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      return false;
    }

    const payload = JSON.parse(atob(tokenParts[1]));
    if (!payload.exp || typeof payload.exp !== "number") {
      return false;
    }

    const currentTimeInSeconds = Date.now() / 1000;

    return currentTimeInSeconds < payload.exp;
  } catch (error) {
    return false;
  }
};

export const validatePassword = (_: any, value: string) => {
  if (value.length < 6) {
    return Promise.reject("Enter a valid password eg: Test@12!");
  }
  if (!emailPattern.PATTERN.test(value)) {
    return Promise.reject("Enter a valid password eg: Test@12!");
  }

  return Promise.resolve();
};
