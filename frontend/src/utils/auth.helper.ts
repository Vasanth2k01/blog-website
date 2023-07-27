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
