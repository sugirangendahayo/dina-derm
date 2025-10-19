// frontend/src/components/ProductManagement.js (New, for admin/products)
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data.products)) // Adjust based on response
      .catch((err) => console.error(err));
  }, []);

  // Add form for create, update, delete buttons with API calls

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      {/* Form for add product */}
      {/* List with edit/delete */}
    </div>
  );
};

export default ProductManagement;
