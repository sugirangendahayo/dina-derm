import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/ui/Navbar";
import axios from "axios";

// Set the base URL for all Axios requests
axios.defaults.baseURL = "http://localhost:5000";

import Home from "@pages/Home";
import About from "@pages/About";
import Contact from "@pages/Contact";
import Collection from "@pages/Collection";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import AdminDashboard from "@pages/auth/admin/AdminDashboard";
import ProductManagement from "@pages/auth/components/components/ProductManagement";
import OrderManagement from "@pages/auth/components/components/OrderManagement";
import UserManagement from "@pages/auth/components/UserManagement";
import Profile from "@pages/Profile";
import AdminRoute from "@components/AdminRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/about" element={<About />} /> {/* About page */}
          <Route path="/contact" element={<Contact />} /> {/* Contact page */}
          <Route path="/collection" element={<Collection />} />{" "}
          {/* Collection page */}
          <Route path="/login" element={<Login />} /> {/* Login page */}
          <Route path="/signup" element={<Signup />} /> {/* Signup page */}
          <Route path="/profile" element={<Profile />} />
          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="users" element={<UserManagement />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
