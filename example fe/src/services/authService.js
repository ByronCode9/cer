// authService.js

import Cookies from "js-cookie";
import api, { setTokenInHeader } from "./api";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const response = await api.post("/login", credentials);
      // debugger
      const userString = JSON.stringify(response.data.user);
      Cookies.set('user', userString);
      setTokenInHeader(response.data.user.token);

      return response;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };

  const signup = async (data) => {
    try {
      const response = await api.post("/signup", data);
      if (response.status === 201) {
        return response;
      } else {
        // Handle error
        const errorData = await response.json();
        console.error("Signup failed:", errorData.error);
        return null;
      }
    } catch (error) {
      console.error("Signup error:", error.response.data.error);
      return error;
    }
  };

  const logout = () => {
    Cookies.remove("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
