import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectPublic = ({ children }) => {
  const { logged } = useSelector((state) => state.auth);

  return logged ? <Navigate to="/dashboard" /> : children;
};

export default ProtectPublic;