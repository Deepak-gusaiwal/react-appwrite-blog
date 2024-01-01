import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
const Protected = () => {
  const { isUserActive } = useSelector((state) => state.userSliceReducer);
  return isUserActive ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
