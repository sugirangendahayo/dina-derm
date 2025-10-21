// frontend/src/pages/ProductDetails.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useCartStore from "@/pages/store/cartStore";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addItem = useCartStore((state) => state.addItem);

  // Helper function to ensure proper image URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    if (imagePath.startsWith("/uploads")) {
      return `http://localhost:5000${imagePath}`;
    }

    return `http://localhost:5000/uploads/${imagePath}`;
  };

  // Helper function to parse price safely
  const parsePrice = (price) => {
    if (price === null || price === undefined) return 0;
    const parsed = parseFloat(price);
    return isNaN(parsed) ? 0 : parsed;
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/products/${id}`);
      console.log("API Response:", res.data); // Debug log

      const fetchedProduct = {
        ...res.data.product,
        variants: res.data.variants || [],
        additional_images:
          typeof res.data.product.additional_images === "string"
            ? JSON.parse(res.data.product.additional_images)
            : res.data.product.additional_images || [],
      };

      console.log("Processed Product:", fetchedProduct); // Debug log

      setProduct(fetchedProduct);

      // Set the first variant as selected, or null if no variants
      const firstVariant = fetchedProduct.variants?.[0] || null;
      setSelectedVariant(firstVariant);
    } catch (err) {
      console.error("Error loading product:", err);
      setError("Failed to load product");
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!product) return;

    let images = [
      getImageUrl(product.default_image),
      ...(product.additional_images || []).map((img) => getImageUrl(img)),
    ];

    // If we have a selected variant with images, use those instead
    if (
      selectedVariant &&
      selectedVariant.images &&
      selectedVariant.images.length > 0
    ) {
      images = selectedVariant.images.map((img) => getImageUrl(img));
    }

    // Filter out empty image URLs
    images = images.filter((img) => img && img !== "");

    setAllImages(images);
    setSelectedImage(images[0] || getImageUrl(product.default_image) || "");
  }, [selectedVariant, product]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem(product, selectedVariant);
    toast.success(`${product.name} added to cart!`);
  };

  // Calculate current price safely
  const getCurrentPrice = () => {
    if (!product) return 0;

    // If we have a selected variant, use its price
    if (selectedVariant && selectedVariant.price !== undefined) {
      return parsePrice(selectedVariant.price);
    }

    // Otherwise use product base_price
    return parsePrice(product.base_price);
  };

  const currentPrice = getCurrentPrice();

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-center">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Product Not Found
          </h3>
          <p className="text-gray-400 mb-6">
            {error || "The product you're looking for doesn't exist."}
          </p>
          <Link
            to="/collection"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            to="/collection"
            className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Collection
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x400/1f2937/9ca3af?text=Image+Not+Found";
                }}
              />
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto py-2">
                {allImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                      img === selectedImage
                        ? "border-red-500 scale-105"
                        : "border-gray-600 hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedImage(img)}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/80x80/1f2937/9ca3af?text=Image";
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-red-500">
                  ${currentPrice.toFixed(2)}
                </span>
                {product.variants && product.variants.length > 0 && (
                  <span className="text-gray-400 text-sm">
                    ({product.variants.length} variants available)
                  </span>
                )}
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Variants Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Available Variants
                </h3>
                <select
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors mb-4"
                  value={selectedVariant?.variant_name || ""}
                  onChange={(e) => {
                    const variant = product.variants.find(
                      (v) => v.variant_name === e.target.value
                    );
                    setSelectedVariant(variant);
                  }}
                >
                  {product.variants.map((variant) => (
                    <option
                      key={variant.variant_name}
                      value={variant.variant_name}
                    >
                      {variant.variant_name} - $
                      {parsePrice(variant.price).toFixed(2)}
                    </option>
                  ))}
                </select>

                {selectedVariant?.attributes && (
                  <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Variant Details:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(selectedVariant.attributes).map(
                        ([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-400 capitalize">
                              {key.replace(/_/g, " ")}:
                            </span>
                            <span className="text-white font-medium">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 cursor-pointer"
              onClick={handleAddToCart}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to Cart - ${currentPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
