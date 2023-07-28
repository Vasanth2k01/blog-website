import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
  BrowserRouter,
} from "react-router-dom";
import Home from "../../Pages/Home/Home";
import LoginPage from "../../Pages/Login/Login";
import BlogComp from "../Blog/Blog";
import NewBlog from "../Blog/NewBlog/NewBlog";
import ProtectedRoute from "../Auth/PrivateRoute/PrivateRoute";
import EditBlog from "../Blog/EditBlog/EditBlog";
import { isTokenExpired } from "../../utils/auth.helper";
import { useSelector } from "react-redux";
import { RootState } from "../../reducer/store";
import { routes } from "../../utils/routes";

const RouterApp: React.FC = () => {
  const token: any = useSelector((state: RootState) => {
    const stateToken = state.user.data?.token;
    if (stateToken === undefined) {
      return localStorage.getItem("token");
    }

    return stateToken;
  });

  const authStatus = isTokenExpired(token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.SIGNUP} element={<Home />} />
        <Route path={routes.LOGIN} element={<LoginPage />} />
        <Route element={<ProtectedRoute auth={authStatus} />}>
          <Route path={routes.blog.BLOG} element={<Outlet />}>
            <Route index element={<BlogComp />} />
            <Route path={routes.blog.NEW} element={<NewBlog />} />
            <Route path="edit/:blogId" element={<EditBlog />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={routes.LOGIN} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;
