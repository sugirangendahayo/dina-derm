// frontend/src/pages/AdminDashboard.js (New)
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="flex min-h-screen bg-gray-100 pt-24">
      <aside className="w-64 bg-white p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <ul>
          <li>
            <Link
              to="products"
              onClick={() => setActiveTab("products")}
              className={`block py-2 px-4 rounded ${
                activeTab === "products" ? "bg-blue-100" : ""
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
                activeTab === "orders" ? "bg-blue-100" : ""
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
                activeTab === "users" ? "bg-blue-100" : ""
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
