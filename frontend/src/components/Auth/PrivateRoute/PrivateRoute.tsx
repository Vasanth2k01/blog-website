import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  auth: boolean;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ auth }) => {
  if (!auth) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default React.memo(ProtectedRoute);
