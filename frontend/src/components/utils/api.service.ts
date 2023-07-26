import axios, { AxiosRequestConfig } from "axios";
import router from "../../components/Router/Router";

const accessToken = localStorage.getItem("access-token");

export const instance = axios.create({
  baseURL: "http://localhost:4002/api",
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
  },
});

const AUTH_ROUTE = ["/api/**"];

function getHeader(path: string): string {
  if (AUTH_ROUTE.includes(path)) {
    return `Bearer ${accessToken}`;
  }
  return "";
}

// instance.interceptors.response.use(
//   (response) => response.data,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response.status === 401 &&
//       originalRequest.url === "http://localhost:4002/api/refreshToken"
//     ) {
//       router.push('/signup');
//       throw error;
//     }

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem("refresh-token");

//       try {
//         const res = await instance.post("/refreshToken/" + refreshToken);

//         if (res.status === 201) {
//           localStorage.setToken(res.data);
//           instance.defaults.headers.common["Authorization"] =
//             "Bearer " + localStorage.getItem("access-token");
//           return instance(originalRequest);
//         }
//       } catch (err) {
//         throw new Error("Error in refreshing the token", err);
//       }
//     }
//     throw error;
//   }
// );

export const { get, post, put, delete: remove } = instance;
