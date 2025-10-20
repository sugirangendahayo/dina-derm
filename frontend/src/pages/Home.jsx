import React, {useEffect} from "react";
import DottedGlowBackgroundDemoSecond from "@/components/DottedGlowBackgroundDemoSecond";
import initializeAOS from "@/components/utils/aosConfig";
import Melanin from "@/assets/beauty-girl.png";

const Home = () => {
  useEffect(() => {
    initializeAOS();
  }, []);

  return (
    <>
      <section className="pt-24 bg-black min-h-screen flex items-center justify-center">
        <DottedGlowBackgroundDemoSecond />
      </section>
      <section className="h-screen bg-zinc-900 flex flex-col">
        <div className="flex flex-row items-center justify-center gap-4 mt-12">
          <div
            className="flex flex-col items-center justify-center gap-2  p-3 rounded shadow shadow-gray-400"
            data-aos="fade-down"
          >
            <span>
              <svg
                className="w-16 h-16 text-white"
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                ></path>
              </svg>
            </span>
            <p className="font-semibold text-gray-400">
              Quality Products & Best Price
            </p>
          </div>
          <div
            className="flex flex-col items-center justify-center gap-2  p-3 rounded shadow shadow-gray-400"
            data-aos="fade-up"
          >
            <span>
              <svg
                className="w-16 h-16 text-white"
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                ></path>
              </svg>
            </span>
            <p className="font-semibold text-gray-400">
              Easy Returns & Customization
            </p>
          </div>
          <div
            className="flex flex-col items-center justify-center gap-2  p-3 rounded shadow shadow-gray-400"
            data-aos="fade-down"
          >
            <span>
              <svg
                className="w-16 h-16 text-white"
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                ></path>
              </svg>
            </span>
            <p className="font-semibold text-gray-400">
              Free delivery, Installation & Maintenance
            </p>
          </div>
          <div
            className="flex flex-col items-center justify-center gap-2  p-3 rounded shadow shadow-gray-400"
            data-aos="fade-up"
          >
            <span>
              <svg
                className="w-16 h-16 text-white"
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
            We want to keep all skin healthy. That’s why we offer superior
            products for moisturization and have formulations for specific skin
            concerns and needs. We aim to rescue dry skin to its best healthy
            self. Our mission is to create skincare that truly understands every
            skin type. Whether your skin is dry, oily, or sensitive, we believe
            everyone deserves products that nourish, protect, and restore
            balance. We carefully choose ingredients that are
            dermatologist-approved and safe for daily use, giving your skin the
            gentle care it deserves. We don’t just treat surface dryness — we
            focus on deep hydration and lasting protection. Our formulas work to
            strengthen your skin’s natural barrier, helping it stay smooth,
            soft, and radiant throughout the day. With consistent use, you’ll
            feel a visible difference in your skin’s texture and glow.
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
    </>
  );
};

export default Home;
