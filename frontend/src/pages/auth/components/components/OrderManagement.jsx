// frontend/src/components/OrderManagement.js (New, for admin/orders)
import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Delete button for each order

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
      {/* List with delete */}
    </div>
  );
};

export default OrderManagement;
