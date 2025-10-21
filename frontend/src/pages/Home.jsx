import React, { useEffect, useState } from "react";
import DottedGlowBackgroundDemoSecond from "@/components/DottedGlowBackgroundDemoSecond";
import initializeAOS from "@/components/utils/aosConfig";
import { Link } from "react-router-dom";
import Melanin from "@/assets/beauty-girl.png";
import Product1 from "@/assets/lotion1.png";
import Product2 from "@/assets/lotion2.png";
import Product3 from "@/assets/lotion3.png";
import Product4 from "@/assets/lotion4.png";
import Product5 from "@/assets/lotion5.png";
import Product6 from "@/assets/lotion6.png";
import Product7 from "@/assets/lotion7.png";
import Product8 from "@/assets/lotion8.png";

const Home = () => {
  useEffect(() => {
    initializeAOS();
  }, []);

  const latestProducts = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      description: "We don't just sell products, we sell skin health.",
      image: Product1,
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      description: "Meet the luxury of your skin with our premium products.",
      image: Product2,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      description:
        "Experience the best of your skin with our premium products.",
      image: Product3,
    },
    {
      id: 4,
      name: "Product 4",
      price: 400,
      description:
        "Experience the best of your skin with our premium products.",
      image: Product4,
    },
    {
      id: 5,
      name: "Product 5",
      price: 500,
      description:
        "Experience the best of your skin with our premium products.",
      image: Product5,
    },
    {
      id: 6,
      name: "Product 6",
      price: 600,
      description:
        "Experience the best of your skin with our premium products.",
      image: Product6,
    },
    {
      id: 7,
      name: "Product 7",
      price: 700,
      description:
        "Experience the best of your skin with our premium products.",
      image: Product7,
    },
    {
      id: 8,
      name: "Product 8",
      price: 800,
      description:
        "Experience the best of your skin with our premium products.",
      image: Product8,
    },
  ];

  // Testimonial Carousel Component
  const TestimonialCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const testimonials = [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Marketing Director",
        company: "TechCorp",
        content:
          "These skincare products completely transformed my skin. The results I've experienced are remarkable and the customer support is exceptional.",
        avatar: "👩‍💼",
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Product Manager",
        company: "InnovateLabs",
        content:
          "Outstanding quality! The attention to natural ingredients and gentle formulations helped my sensitive skin achieve its best state.",
        avatar: "👨‍💻",
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        role: "CEO",
        company: "StartUp Ventures",
        content:
          "A game-changer for my skincare routine. The products have been invaluable to maintaining healthy, glowing skin despite my busy schedule.",
        avatar: "👩‍🎓",
      },
      {
        id: 4,
        name: "David Thompson",
        role: "CTO",
        company: "Digital Solutions",
        content:
          "Professional, reliable, and highly effective. I've tried many skincare brands, but this one stands out from the rest in quality and results.",
        avatar: "👨‍🔧",
      },
    ];

    const nextSlide = () => {
      setCurrentSlide((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    };

    const prevSlide = () => {
      setCurrentSlide((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
    };

    const goToSlide = (index) => {
      setCurrentSlide(index);
    };

    // Auto-advance slides
    useEffect(() => {
      const timer = setInterval(() => {
        nextSlide();
      }, 5000);

      return () => clearInterval(timer);
    }, [currentSlide]);

    return (
      <div className="max-w-6xl mx-auto px-4 py-16 overflow-hidden">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="text-4xl font-bold text-white mb-4">
            What Our <span className="text-red-500">Customers</span> Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover why people trust our products for their skincare journey
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Testimonial Slides */}
          <div className="relative h-80 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
                  index === currentSlide
                    ? "translate-x-0 opacity-100"
                    : index < currentSlide
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
                }`}
                
              >
                <div className="flex flex-col items-center justify-center h-full px-8 text-center">
                  {/* Avatar */}
                  <div className="text-5xl mb-6 transform hover:scale-110 transition-transform duration-300">
                    {testimonial.avatar}
                  </div>

                  {/* Content */}
                  <div className="max-w-3xl">
                    <p className="text-xl text-gray-300 leading-relaxed mb-6 italic">
                      "{testimonial.content}"
                    </p>

                    {/* Author Info */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white">
                        {testimonial.name}
                      </h3>
                      <div className="text-gray-400">
                        <span className="font-semibold">
                          {testimonial.role}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{testimonial.company}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/80 hover:bg-black text-white hover:text-red-500 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-600 cursor-pointer"
            aria-label="Previous testimonial"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/80 hover:bg-black text-white hover:text-red-500 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-600 cursor-pointer"
            aria-label="Next testimonial"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Colored Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 cursor-pointer ${
                  index === currentSlide
                    ? "bg-red-500 scale-110 shadow-lg"
                    : "bg-white border-2 border-gray-400 hover:border-red-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
            <div
              className="h-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-1000 ease-out"
              style={{
                width: `${((currentSlide + 1) / testimonials.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-6">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm font-medium border border-gray-600">
            <span className="text-red-500 font-bold">{currentSlide + 1}</span>
            <span className="mx-2">/</span>
            <span>{testimonials.length}</span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="pt-24 bg-black min-h-screen flex items-center justify-center">
        <DottedGlowBackgroundDemoSecond />
      </section>

      <section className="h-screen bg-zinc-900 flex flex-col">
        <div className="flex flex-row items-center justify-center gap-4 mt-12">
          {/* Your existing feature cards */}
          <div
            className="flex flex-col items-center justify-center gap-2 p-3 rounded shadow shadow-gray-400"
            data-aos="fade-down"
          >
            <span>
              <svg
                className="w-16 h-16 text-white"
                data-slot="icon"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                ></path>
              </svg>
            </span>
            <p className="font-semibold text-gray-400">
              Quality Products & Best Price
            </p>
          </div>

          <div
            className="flex flex-col items-center justify-center gap-2 p-3 rounded shadow shadow-gray-400"
            data-aos="fade-up"
          >
            <span>
              <svg
                className="w-16 h-16 text-white"
                data-slot="icon"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                ></path>
              </svg>
            </span>
            <p className="font-semibold text-gray-400">
              Easy Returns & Customization
            </p>
          </div>

          <div
            className="flex flex-col items-center justify-center gap-2 p-3 rounded shadow shadow-gray-400"
            data-aos="fade-down"
          >
            <span>
              <svg
                className="w-16 h-16 text-white"
                data-slot="icon"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                ></path>
              </svg>
            </span>
            <p className="font-semibold text-gray-400">
              Free delivery, Installation & Maintenance
            </p>
          </div>

          <div
            className="flex flex-col items-center justify-center gap-2 p-3 rounded shadow shadow-gray-400"
            data-aos="fade-up"
          >
            <span>
              <svg
                className="w-16 h-16 text-white"
                data-slot="icon"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                ></path>
              </svg>
            </span>
            <p className="font-semibold text-gray-400">
              Our impressive Customer Support
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 font-semibold text-center p-4 m-8">
          <h1 className="text-4xl font-bold text-white" data-aos="fade-down">
            What do <span className="text-red-500">we</span> do?
          </h1>
          <p className="text-white text-xl italic" data-aos="fade-up">
            <span className="text-red-500 text-3xl italic">" </span>
            We want to keep all skin healthy. That's why we offer superior
            products for moisturization and have formulations for specific skin
            concerns and needs. We aim to rescue dry skin to its best healthy
            self. Our mission is to create skincare that truly understands every
            skin type. Whether your skin is dry, oily, or sensitive, we believe
            everyone deserves products that nourish, protect, and restore
            balance. We carefully choose ingredients that are
            dermatologist-approved and safe for daily use, giving your skin the
            gentle care it deserves. We don't just treat surface dryness — we
            focus on deep hydration and lasting protection. Our formulas work to
            strengthen your skin's natural barrier, helping it stay smooth,
            soft, and radiant throughout the day. With consistent use, you'll
            feel a visible difference in your skin's texture and glow.
            <span className="text-red-500 text-3xl italic"> "</span>
          </p>

          {/* Three dots carousel */}
          <div className="flex items-center justify-center gap-2 mt-10 cursor-pointer">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      <section className="bg-black">
        <h1 className="text-4xl font-bold text-white text-center py-8">
          our latest products
        </h1>
        <div className="grid grid-cols-4 gap-4 p-4">
          {latestProducts.map((product) => (
            <div
              key={product.id}
              className="backdrop-blur-md m-2 bg-white/10 border border-white/20 py-2 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-white">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-300 mb-2">${product.price}</p>
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <Link to="/collection">
                  <button className="w-full border-[1px] border-red-500 text-white py-2 rounded hover:bg-red-500 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    View in collection
                    
                    <span>→</span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL CAROUSEL SECTION */}
      <section className="bg-zinc-900 py-16">
        <TestimonialCarousel />
      </section>
    </>
  );
};

export default Home;
