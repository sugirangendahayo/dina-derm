// frontend/src/pages/Collection.js
import React, { useState, useEffect } from "react";
import productsData from "@/data/products.json"; // Direct import
import { Link } from "react-router-dom";

const Collection = () => {
  const [data, setData] = useState({ categories: [], products: [] });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    try {
      setData(productsData);
      if (productsData.categories && productsData.categories.length > 0) {
        setSelectedCategory(productsData.categories[0]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Failed to load products");
      setLoading(false);
    }
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? data.products || []
      : (data.products || []).filter(
          (product) => product.category === selectedCategory
        );

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  const gridClass = `grid grid-cols-1 sm:grid-cols-2 ${
    isExpanded ? "lg:grid-cols-3" : "lg:grid-cols-4"
  } gap-6`;

  return (
    <div className="flex min-h-screen bg-black pt-24">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-20 left-4 z-50 backdrop-blur-md m-2 bg-white/10 border border-white/20 shadow-lg  text-white px-4 py-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-24 left-0 h-[calc(100vh-6rem)] backdrop-blur-md m-2 bg-white/10 border border-white/20 shadow-lg rounded-lg py-2 z-40 overflow-y-auto transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0 w-64 p-4" : "-translate-x-full w-0"}
          md:translate-x-0 ${isExpanded ? "md:w-64 md:p-4" : "md:w-12 md:p-0"}`}
      >
        <div
          className={`flex ${
            isExpanded ? "justify-end" : "justify-center"
          } items-center h-10`}
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden md:block text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            {isExpanded ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
        </div>
        {(isExpanded || !isDesktop) && (
          <>
            <h2 className="text-xl font-bold mb-4 text-white">Categories</h2>
            <ul>
              {(data.categories || []).map((cat) => (
                <li
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    if (!isDesktop) setIsSidebarOpen(false);
                  }}
                  className={`cursor-pointer py-2 px-4 hover:bg-gray-200 rounded text-white ${
                    selectedCategory === cat ? "bg-blue-100 font-bold" : ""
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>

      {/* Products Section */}
      <main className="flex-1 px-8 transition-all duration-300">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Skincare Collection
        </h1>
        <div className={gridClass}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div className="backdrop-blur-md m-2 bg-white/10 border border-white/20  py-2  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={product.default_image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=Image+Not+Found";
                    }}
                  />
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-300 mb-2">
                      ${product.price ? product.price.toFixed(2) : "N/A"}
                    </p>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <button className="w-full border-[1px] border-red-500 text-white py-2 rounded hover:bg-red-500 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                      Add to Cart
                      <lord-icon
                        src="src/data/cart-jump.json"
                        trigger="loop"
                        colors="primary:#fff,secondary:#C41E3A "
                        style={{ width: "24px", height: "24px" }}
                      />
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Collection;
