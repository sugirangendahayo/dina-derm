// frontend/src/pages/Cart.js
import React , {useEffect}from "react";
import useCartStore from "@/pages/store/cartStore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } =
    useCartStore();
    useEffect(() => {
      AOS.init();
    }, []);

  const handleUpdateQuantity = (itemId, delta) => {
    const item = items.find((i) => i.id === itemId);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity > 0) {
        updateQuantity(itemId, newQuantity);
      } else {
        removeItem(itemId);
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-24 p-8 text-white flex flex-col items-center justify-center">
        <div className="text-center" data-aos="fade-up">
          <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-16 h-16 text-white"
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
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-md">
            Looks like you haven't added any products to your cart yet. Discover
            our amazing skincare collection!
          </p>
          <Link
            to="/collection"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            Start Shopping
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            data-aos="fade-down"
          >
            Your <span className="text-red-500">Shopping Cart</span>
          </h1>
          <p className="text-gray-300 text-lg" data-aos="fade-up">
            Review your selected products and proceed to checkout
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 hover:border-red-500/30 transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border border-gray-700">
                      <img
                        src={`http://localhost:5000${item.details.image}`}
                        alt={item.details.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-2">
                          {item.details.name}
                        </h3>
                        {item.details.variantName && (
                          <p className="text-red-400 text-sm mb-2">
                            {item.details.variantName}
                          </p>
                        )}
                        <p className="text-red-500 font-bold text-xl">
                          $
                          {typeof item.details.price === "number" &&
                          !isNaN(item.details.price)
                            ? item.details.price.toFixed(2)
                            : "0.00"}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className="w-10 h-10 bg-gray-800 hover:bg-red-500 text-white rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
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
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="text-white font-semibold text-lg min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="w-10 h-10 bg-gray-800 hover:bg-red-500 text-white rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
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
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Subtotal and Remove */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                      <div>
                        <span className="text-gray-400 text-sm">
                          Subtotal:{" "}
                        </span>
                        <span className="text-white font-semibold text-lg">
                          ${(item.details.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200 flex items-center cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
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
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 sticky top-24"
              data-aos="fade-left"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-white text-lg font-bold">
                    <span>Total</span>
                    <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 mb-4 cursor-pointer">
                Proceed to Checkout
                <svg
                  className="w-5 h-5 ml-2 inline"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>

              <button
                onClick={() => {
                  clearCart();
                  toast.success("Cart cleared successfully");
                }}
                className="w-full border-2 border-gray-600 hover:border-red-500 text-gray-300 hover:text-red-400 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                Clear Cart
              </button>

              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center text-green-400 text-sm">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Free shipping on orders over $50
                </div>
                <div className="flex items-center text-green-400 text-sm mt-2">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  30-day return policy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
