import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../../../utils/routes";

interface ProtectedRouteProps {
  auth: boolean;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ auth }) => {
  if (!auth) {
    return <Navigate to={routes.LOGIN} />;
  }

  return <Outlet />;
};

export default React.memo(ProtectedRoute);
