import React, { useState, useEffect } from "react";
import axios from "axios";

const Collection = () => {
  const [data, setData] = useState({ categories: [], products: [] });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/products.json")
      .then((response) => {
        setData(response.data);
        if (response.data.categories.length > 0) {
          setSelectedCategory(response.data.categories[0]);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? data.products
      : data.products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-20 left-4 z-50 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 bg-white p-4 shadow-lg transform transition-transform duration-300 ease-in-out fixed md:relative md:translate-x-0 z-40 h-full overflow-y-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul>
          {data.categories.map((cat) => (
            <li
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setIsSidebarOpen(false); // Close sidebar on mobile after selection
              }}
              className={`cursor-pointer py-2 px-4 hover:bg-gray-200 rounded ${
                selectedCategory === cat ? "bg-blue-100 font-bold" : ""
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Products Section */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Lotions Collection</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {product.description}
                </p>
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
