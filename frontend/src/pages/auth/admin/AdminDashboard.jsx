// frontend/src/pages/AdminDashboard.js (New)
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="flex min-h-screen bg-black ">
      <aside className="w-64 backdrop-blur-md m-2 bg-white/10 border border-white/20 shadow-lg rounded-lg py-2 z-40 overflow-y-auto transition-all duration-300 ease-in-out p-4 text-white">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <ul>
          <li>
            <Link
              to="dashboard"
              onClick={() => setActiveTab("dashboard")}
              className={`block py-2 px-4 rounded ${
                activeTab === "dashboard" ? "bg-red-500 text-white " : ""
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="products"
              onClick={() => setActiveTab("products")}
              className={`block py-2 px-4 rounded ${
                activeTab === "products" ? "bg-red-500 text-white " : ""
              }`}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="orders"
              onClick={() => setActiveTab("orders")}
              className={`block py-2 px-4 rounded ${
                activeTab === "orders" ? "bg-red-500 text-white " : ""
              }`}
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="users"
              onClick={() => setActiveTab("users")}
              className={`block py-2 px-4 rounded ${
                activeTab === "users" ? "bg-red-500 text-white " : ""
              }`}
            >
              Users
            </Link>
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-8">
        <Outlet /> {/* Renders child routes: ProductsManagement, etc. */}
      </main>
    </div>
  );
};

export default AdminDashboard;
