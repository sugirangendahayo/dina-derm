import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Trigger after scrolling 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "w-[80%] mx-auto backdrop-blur-md m-2 bg-white/10 border border-white/20 shadow-lg rounded-lg py-2"
          : "w-[90%]  py-4 m-2 mx-auto "
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around ">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-white">
              Dina<span className="text-red-500">Derm</span>
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-white hover:text-gray-300">
              Home
            </a>
            <a href="#about" className="text-white hover:text-gray-300">
              About
            </a>
            <a href="/collection" className="text-white hover:text-gray-300">
              Collection
            </a>
            <a href="#contact" className="text-white hover:text-gray-300">
              Contact
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-white border border-white rounded hover:bg-white/10">
              Login
            </button>
            <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200">
              Signup
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
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
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <a href="#home" className="block text-white hover:text-gray-300">
              Home
            </a>
            <a href="#about" className="block text-white hover:text-gray-300">
              About
            </a>
            <a
              href="#services"
              className="block text-white hover:text-gray-300"
            >
              Services
            </a>
            <a href="#contact" className="block text-white hover:text-gray-300">
              Contact
            </a>
            <button className="w-full px-4 py-2 text-white border border-white rounded hover:bg-white/10">
              Login
            </button>
            <button className="w-full px-4 py-2 bg-white text-black rounded hover:bg-gray-200">
              Signup
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
