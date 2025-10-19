import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // You can return a loading spinner here
    return <div>Loading...</div>;
  }

  return user && user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
