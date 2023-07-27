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
        <Route path="/signup" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute auth={authStatus} />}>
          <Route path="/blog" element={<Outlet />}>
            <Route index element={<BlogComp />} />
            <Route path="new" element={<NewBlog />} />
            <Route path="edit/:blogId" element={<EditBlog />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;
