/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`/api/orders/${id}`);
        toast.success("Order deleted successfully!");
        fetchOrders();
      } catch (err) {
        toast.error("Failed to delete order");
      }
    }
  };

  const toggleExpand = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 p-6 text-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Order <span className="text-red-500">Management</span>
            </h1>
            <p className="text-gray-400">
              Manage customer orders and track order status
            </p>
          </div>
          <div className="text-sm text-gray-400">
            Total Orders:{" "}
            <span className="text-red-500 font-bold">{orders.length}</span>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700">
              <svg
                className="w-16 h-16 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              There are no orders in the system yet. Orders will appear here
              once customers make purchases.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-gray-800">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        Order #{order.id}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        User ID: {order.user_id} •{" "}
                        {formatDate(order.created_at || new Date())}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-500">
                        ${order.total_amount}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors border border-blue-500/30 flex items-center gap-2"
                        onClick={() => toggleExpand(order.id)}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {expandedOrder === order.id ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          )}
                        </svg>
                        {expandedOrder === order.id
                          ? "Hide Items"
                          : "Show Items"}
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/30 flex items-center gap-2"
                        onClick={() => handleDelete(order.id)}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Order Items */}
              {expandedOrder === order.id && (
                <div className="p-6 bg-gray-800/20 border-t border-gray-800">
                  <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Order Items
                  </h4>

                  {order.items?.length > 0 ? (
                    <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="px-6 py-4 text-left text-white font-semibold">
                              Product Variant
                            </th>
                            <th className="px-6 py-4 text-left text-white font-semibold">
                              Quantity
                            </th>
                            <th className="px-6 py-4 text-left text-white font-semibold">
                              Unit Price
                            </th>
                            <th className="px-6 py-4 text-left text-white font-semibold">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/20 transition-colors"
                            >
                              <td className="px-6 py-4">
                                <div className="text-white">
                                  Variant #{item.variant_id}
                                </div>
                                {item.product_name && (
                                  <div className="text-gray-400 text-sm">
                                    {item.product_name}
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-gray-300 font-semibold">
                                  {item.quantity}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-red-500 font-bold">
                                ${item.price}
                              </td>
                              <td className="px-6 py-4 text-white font-bold">
                                ${(item.quantity * item.price).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-gray-800/50">
                            <td
                              colSpan="3"
                              className="px-6 py-4 text-right text-white font-semibold"
                            >
                              Order Total:
                            </td>
                            <td className="px-6 py-4 text-red-500 font-bold text-lg">
                              ${order.total_amount}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <svg
                        className="w-16 h-16 text-gray-500 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <p className="text-gray-400">
                        No items found in this order
                      </p>
                    </div>
                  )}

                  {/* Order Summary */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                      <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Customer Info
                      </h5>
                      <p className="text-gray-400 text-sm">
                        User ID: {order.user_id}
                      </p>
                    </div>
                    <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                      <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Order Date
                      </h5>
                      <p className="text-gray-400 text-sm">
                        {formatDate(order.created_at || new Date())}
                      </p>
                    </div>
                    <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                      <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Order Status
                      </h5>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
