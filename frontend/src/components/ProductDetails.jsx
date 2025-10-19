// frontend/src/pages/ProductDetails.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "@/data/products.json";

const ProductDetails = () => {
  const { id } = useParams();
  const product = productsData.products.find((p) => p.id === parseInt(id));

  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || null
  );
  const [allImages, setAllImages] = useState([
    product?.default_image,
    ...(product?.additional_images || []),
  ]);
  const [selectedImage, setSelectedImage] = useState(product?.default_image);

  useEffect(() => {
    if (!product) return;

    let images = [product.default_image, ...(product.additional_images || [])];
    if (
      selectedVariant &&
      selectedVariant.images &&
      selectedVariant.images.length > 0
    ) {
      images = selectedVariant.images;
    }
    setAllImages(images);
    setSelectedImage(images[0]);
  }, [selectedVariant, product]);

  if (!product) {
    return (
      <div className="flex min-h-screen bg-black items-center justify-center text-white">
        Product not found
      </div>
    );
  }

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;

  return (
    <div className="min-h-screen bg-black pt-24 p-8 text-white">
      <div>
        <Link to="/collection">Back to Collection</Link>
      </div>
      <h1 className="text-4xl font-bold mb-6">{product.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg mb-4"
          />
          <div className="flex flex-wrap gap-2">
            {allImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer ${
                  img === selectedImage ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-2xl font-semibold mb-4">
            ${currentPrice.toFixed(2)}
          </p>
          <p className="mb-6">{product.description}</p>
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Variants</h3>
              <select
                className="select select-bordered w-full max-w-xs bg-gray-800 text-white"
                value={selectedVariant.variant_name}
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
                    {variant.variant_name} - ${variant.price.toFixed(2)}
                  </option>
                ))}
              </select>
              {selectedVariant.attributes && (
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
