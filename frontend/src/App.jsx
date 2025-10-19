import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@context/AuthContext";
import Navbar from "@components/ui/Navbar";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

import Home from "@pages/Home";
import About from "@pages/About";
import Contact from "@pages/Contact";
import Collection from "@pages/Collection";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import AdminDashboard from "@pages/auth/admin/AdminDashboard";
import ProductManagement from "@pages/auth/components/ProductManagement";
import OrderManagement from "@pages/auth/components/OrderManagement";
import UserManagement from "@pages/auth/components/UserManagement";
import Profile from "@pages/Profile";
import AdminRoute from "@components/AdminRoute";
import Dashboard from "@pages/auth/components/Dashboard";

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        !location.pathname.startsWith("/admin") && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="users" element={<UserManagement />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
