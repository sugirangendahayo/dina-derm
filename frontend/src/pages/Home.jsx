import React from "react";
import DottedGlowBackgroundDemoSecond from "@/components/DottedGlowBackgroundDemoSecond";

const Home = () => {
  return (
    <>
      <section className="pt-24 bg-black min-h-screen flex items-center justify-center">
        <DottedGlowBackgroundDemoSecond />
      </section>
      <section className="h-screen bg-gray-100 flex items-center justify-center">
        <h2 className="text-gray-800 text-3xl">Next Section</h2>
      </section>
    </>
  );
};

export default Home;
