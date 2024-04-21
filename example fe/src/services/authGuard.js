import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "./authService";
import Cookies from "js-cookie";

const AuthGuard = ({ children, adminRequired }) => {
  const user = Cookies.get("user");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
