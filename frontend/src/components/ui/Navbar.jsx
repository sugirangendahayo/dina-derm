// frontend/src/components/Navbar.js
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@context/AuthContext";
import { Link } from "react-router-dom";
import useCartStore from "@/pages/store/cartStore"; // Adjust path if needed

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen && !event.target.closest(".user-dropdown")) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserDropdownOpen]);

  const userName = user ? `${user.first_name} ${user.last_name}` : "";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "w-[85%] mx-auto backdrop-blur-md m-2 bg-white/10 border border-white/20 shadow-lg rounded-lg py-2"
          : "w-[95%] py-4 m-2 mx-auto"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-white">
              Dina<span className="text-red-500">Derm</span>
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-gray-300">
              About
            </Link>
            <Link to="/collection" className="text-white hover:text-gray-300">
              Collection
            </Link>
            <Link to="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Icon - Always visible */}
            <Link
              to="/cart"
              className="relative p-2 text-white hover:text-red-500 transition-colors duration-200"
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
              {/* Cart item count badge */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            </Link>

            {user ? (
              /* User Dropdown Menu */
              <div className="relative user-dropdown">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-2 text-white hover:text-red-500 transition-colors duration-200"
                >
                  {/* User Icon */}
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center border-2 border-white/20">
                    <svg
                      className="w-4 h-4 text-white"
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
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isUserDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-white text-sm font-semibold">
                        {userName}
                      </p>
                      <p className="text-gray-300 text-xs">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <svg
                        className="w-4 h-4 mr-3"
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
                      Edit Profile
                    </Link>

                    <Link
                      to="/orders"
                      className="flex items-center px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <svg
                        className="w-4 h-4 mr-3"
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
                      My Orders
                    </Link>

                    <Link
                      to="/wishlist"
                      className="flex items-center px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      Wishlist
                    </Link>

                    <div className="border-t border-white/10 mt-2 pt-2">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-white hover:bg-red-500/20 transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Login/Signup buttons for non-logged in users */
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-white border border-white rounded hover:bg-white/10 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors duration-200"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-white hover:text-red-500 transition-colors duration-200"
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
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none p-2 hover:text-red-500 transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4 backdrop-blur-md m-2 bg-white/10 border border-white/20 shadow-lg rounded-lg py-2">
            <Link
              to="/"
              className="block text-white hover:text-gray-300 px-4 py-2"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-white hover:text-gray-300 px-4 py-2"
            >
              About
            </Link>
            <Link
              to="/collection"
              className="block text-white hover:text-gray-300 px-4 py-2"
            >
              Collection
            </Link>
            <Link
              to="/contact"
              className="block text-white hover:text-gray-300 px-4 py-2"
            >
              Contact
            </Link>

            {user ? (
              <div className="flex flex-col space-y-2 px-4">
                <div className="flex items-center space-x-3 py-2 border-b border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
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
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      {userName}
                    </p>
                    <p className="text-gray-300 text-xs">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="text-white hover:text-red-500 transition-colors duration-200"
                >
                  Edit Profile
                </Link>
                <Link
                  to="/orders"
                  className="text-white hover:text-red-500 transition-colors duration-200"
                >
                  My Orders
                </Link>
                <Link
                  to="/wishlist"
                  className="text-white hover:text-red-500 transition-colors duration-200"
                >
                  Wishlist
                </Link>
                <button
                  onClick={logout}
                  className="text-left text-white hover:text-red-500 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 px-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-white border border-white rounded hover:bg-white/10 text-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 text-center"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
