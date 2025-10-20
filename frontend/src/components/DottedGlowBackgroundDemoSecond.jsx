import React, { useEffect } from "react";
import HeroImage from "@/assets/hero-image.png";
import initializeAOS from "@/components/utils/aosConfig";
import TypewriterText from "@components/TypewriterText";

const DottedGlowBackgroundDemoSecond = () => {
  useEffect(() => {
    initializeAOS();
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-dotted opacity-20"></div>

      <div
        className="flex flex-col items-center justify-center"
        data-aos="fade-left"
      >
        <h1 className="text-4xl md:text-5xl lg:text-[10rem] font-bold text-white">
          {" "}
          Dina
        </h1>
        <p className="text-white text-sm m-8">
          <TypewriterText
            words={[
              "Where clinical expertise meets skin journey.",
              "Personalized skincare, powered by science.",
              "Shine brighter with Dina Derm. ✨",
            ]}
            loop={true}
          />
        </p>
      </div>
      <div className="flex items-center justify-center" data-aos="fade-up">
        <img
          src={HeroImage}
          alt="Hero Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="flex flex-col items-center justify-center"
        data-aos="fade-right"
      >
        <TypewriterText
          words={[
            " Personalized skincare, powered by science.",
            "Where clinical expertise meets skin journey.",
            "Shine brighter with Dina Derm. ✨",
          ]}
          loop={true}
        />
        <h1 className="text-4xl md:text-5xl lg:text-[8rem] font-bold text-red-500">
          Derm
        </h1>
        
      </div>
    </div>
  );
};

export default DottedGlowBackgroundDemoSecond;
