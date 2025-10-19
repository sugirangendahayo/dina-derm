import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@context/AuthContext";
import Home from "@pages/Home";
import About from "@pages/About";
import Contact from "@pages/Contact";
import Navbar from "@components/ui/Navbar";
import Collection from "@pages/Collection";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import AdminDashboard from "@pages/admin/AdminDashboard";
import ProductManagement from "@pages/auth/components/components/ProductManagement";
import OrderManagement from "@pages/auth/components/components/OrderManagement";
import UserManagement from "@pages/auth/components/UserManagement";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      

      <Routes>

        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/about" element={<About />} /> {/* About page */}
        <Route path="/contact" element={<Contact />} /> {/* Contact page */}
        <Route path="/collection" element={<Collection />} /> {/* Collection page */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/signup" element={<Signup />} /> {/* Signup page */}
        <Route path="/admin" element={<AdminDashboard />} /> {/* Admin Dashboard */}
        <Route path="/admin/products" element={<ProductManagement />} /> {/* Product Management */}
        <Route path="/admin/orders" element={<OrderManagement />} /> {/* Order Management */}
        <Route path="/admin/users" element={<UserManagement />} /> {/* User Management */}

      </Routes>
      
    </Router>
    </AuthProvider>
  );
}

export default App;
