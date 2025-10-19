// frontend/src/pages/ProductDetails.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to ensure proper image URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    // If it's already a full URL, return as is
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // If it starts with /uploads, prepend the backend URL
    if (imagePath.startsWith("/uploads")) {
      return `http://localhost:5000${imagePath}`;
    }

    // If it's just a filename, assume it's in uploads
    return `http://localhost:5000/uploads/${imagePath}`;
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/products/${id}`);
      const fetchedProduct = {
        ...res.data.product,
        variants: res.data.variants,
        additional_images:
          typeof res.data.product.additional_images === "string"
            ? JSON.parse(res.data.product.additional_images)
            : res.data.product.additional_images || [],
      };
      setProduct(fetchedProduct);
      setSelectedVariant(fetchedProduct.variants?.[0] || null);
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

    if (
      selectedVariant &&
      selectedVariant.images &&
      selectedVariant.images.length > 0
    ) {
      images = selectedVariant.images.map((img) => getImageUrl(img));
    }

    setAllImages(images);
    setSelectedImage(images[0] || "");
  }, [selectedVariant, product]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-black items-center justify-center text-white">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen bg-black items-center justify-center text-white">
        {error || "Product not found"}
      </div>
    );
  }

  const currentPrice = selectedVariant
    ? selectedVariant.price
    : product.base_price;

  return (
    <div className="min-h-screen bg-black pt-24 p-8 text-white">
      <div>
        <Link to="/collection" className="text-blue-400 hover:text-blue-300">
          ← Back to Collection
        </Link>
      </div>
      <h1 className="text-4xl font-bold mb-6">{product.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg mb-4"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/600x400?text=Image+Not+Found";
            }}
          />
          <div className="flex flex-wrap gap-2">
            {allImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                  img === selectedImage
                    ? "border-blue-500"
                    : "border-transparent"
                } hover:border-white transition-colors`}
                onClick={() => setSelectedImage(img)}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/80x80?text=Image+Not+Found";
                }}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-2xl font-semibold mb-4">
            $
            {typeof currentPrice === "number" && !isNaN(currentPrice)
              ? currentPrice.toFixed(2)
              : "0.00"}
          </p>
          <p className="mb-6">{product.description}</p>
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Variants</h3>
              <select
                className="select select-bordered w-full max-w-xs bg-gray-800 text-white"
                value={selectedVariant?.variant_name || ""}
                onChange={(e) =>
                  setSelectedVariant(
                    product.variants.find(
                      (v) => v.variant_name === e.target.value
                    )
                  )
                }
              >
                {product.variants.map((variant) => (
                  <option
                    key={variant.variant_name}
                    value={variant.variant_name}
                  >
                    {variant.variant_name} - $
                    {typeof variant.price === "number" && !isNaN(variant.price)
                      ? variant.price.toFixed(2)
                      : "0.00"}
                  </option>
                ))}
              </select>
              {selectedVariant?.attributes && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold">Attributes:</h4>
                  <ul>
                    {Object.entries(selectedVariant.attributes).map(
                      ([key, value]) => (
                        <li key={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
          <button className="w-full border-[1px] border-red-500 text-white py-3 rounded hover:bg-red-500 transition-colors flex items-center justify-center gap-2">
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
    </div>
  );
};

export default ProductDetails;
