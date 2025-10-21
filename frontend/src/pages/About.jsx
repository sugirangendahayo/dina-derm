import React from "react";
import { Link } from "react-router-dom";
import initializeAOS from "@/components/utils/aosConfig";

// You can replace these with your actual images
import TeamImage from "@/assets/about-team.jpg";
import FounderImage from "@/assets/founder.jpg";
import LabImage from "@/assets/lab.jpg";

const About = () => {
  React.useEffect(() => {
    initializeAOS();
  }, []);

  const values = [
    {
      icon: "🌿",
      title: "Natural Ingredients",
      description:
        "We source the finest natural ingredients from around the world, ensuring purity and effectiveness in every formulation.",
    },
    {
      icon: "🔬",
      title: "Scientific Innovation",
      description:
        "Combining traditional wisdom with cutting-edge science to create products that deliver real, measurable results.",
    },
    {
      icon: "💚",
      title: "Clean Beauty",
      description:
        "No harsh chemicals, parabens, or sulfates. Just clean, safe, and effective skincare for all skin types.",
    },
    {
      icon: "🌎",
      title: "Sustainability",
      description:
        "Committed to eco-friendly packaging and sustainable practices that protect our planet for future generations.",
    },
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & CEO",
      image: FounderImage,
      bio: "With over 15 years in dermatology, Sarah founded SkinCare to bridge the gap between clinical expertise and natural skincare.",
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Head Chemist",
      image: LabImage,
      bio: "Michael leads our research and development, ensuring every formula meets the highest standards of efficacy and safety.",
    },
    {
      name: "Emily Watson",
      role: "Product Development",
      image: TeamImage,
      bio: "Emily combines her background in herbal medicine with modern skincare science to create innovative products.",
    },
    {
      name: "David Kim",
      role: "Customer Experience",
      image: TeamImage,
      bio: "David ensures every customer receives personalized skincare advice and exceptional support throughout their journey.",
    },
  ];

  const milestones = [
    {
      year: "2018",
      event: "Founded with a vision to revolutionize natural skincare",
    },
    {
      year: "2019",
      event: "Launched our first product line with 5 core products",
    },
    { year: "2020", event: "Reached 10,000 satisfied customers worldwide" },
    { year: "2021", event: "Opened our first flagship store in New York" },
    {
      year: "2022",
      event: "Expanded to international markets across Europe and Asia",
    },
    { year: "2023", event: "Launched our sustainable packaging initiative" },
    {
      year: "2024",
      event: "Celebrated helping over 100,000 people achieve healthier skin",
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-zinc-900"></div>
        <div className="absolute top-10 left-10 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left" data-aos="fade-right">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Our <span className="text-red-500">Story</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Born from a passion for healthy skin and a belief in the power
                of nature, SkinCare was founded to transform the way people care
                for their skin. We combine ancient wisdom with modern science to
                create products that truly work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/collection"
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  Explore Products
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
                <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                  Watch Our Story
                </button>
              </div>
            </div>
            <div className="relative" data-aos="fade-left">
              <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-1 transform rotate-2">
                <div className="bg-black rounded-2xl p-4 transform -rotate-2">
                  <div className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">✨</span>
                      </div>
                      <p className="text-white text-lg font-semibold">
                        Our Journey
                      </p>
                      <p className="text-gray-400">Since 2018</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-bold text-white mb-6">
                Our <span className="text-red-500">Mission</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                To empower everyone to achieve their healthiest, most radiant
                skin through clean, effective, and scientifically-backed
                skincare solutions. We believe that great skincare should be
                accessible, understandable, and enjoyable.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Every product we create is a testament to our commitment to
                quality, transparency, and the belief that nature and science
                can work together to create extraordinary results.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    Dermatologist Tested
                  </h4>
                  <p className="text-gray-400">
                    All products clinically proven
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6" data-aos="fade-left">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-black rounded-xl p-6 border border-gray-800 hover:border-red-500 transition-all duration-300 group hover:transform hover:-translate-y-2"
                >
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-down">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our <span className="text-red-500">Journey</span>
            </h2>
            <p className="text-gray-300 text-lg">
              From a simple idea to transforming skincare routines worldwide
            </p>
          </div>

          <div className="relative" data-aos="fade-up">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 to-transparent"></div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-12 text-right" : "pl-12"
                  }`}
                >
                  <div className="bg-zinc-900 rounded-xl p-6 border border-gray-800 hover:border-red-500 transition-all duration-300">
                    <div className="text-red-500 font-bold text-2xl mb-2">
                      {milestone.year}
                    </div>
                    <p className="text-gray-300">{milestone.event}</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-black z-10"></div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-down">
            <h2 className="text-4xl font-bold text-white mb-4">
              Meet Our <span className="text-red-500">Experts</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Our team of skincare specialists, chemists, and customer care
              experts are dedicated to helping you achieve your skin goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-black rounded-2xl overflow-hidden border border-gray-800 hover:border-red-500 transition-all duration-300 group hover:transform hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-xl">👤</span>
                    </div>
                    <p className="text-white font-semibold">Team Member</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-white font-bold text-xl mb-2">
                    {member.name}
                  </h3>
                  <p className="text-red-500 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="bg-gradient-to-r from-gray-900 to-zinc-900 rounded-2xl p-12 border border-gray-800"
            data-aos="zoom-in"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your{" "}
              <span className="text-red-500">Skincare Journey</span>?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their
              skin with our products. Your journey to healthier, more radiant
              skin starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/collection"
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                Shop Now
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Skincare Advice
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
