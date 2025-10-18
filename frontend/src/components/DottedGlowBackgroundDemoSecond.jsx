import React from "react";
import DottedGlowBackground from "@/components/ui/dotted-glow-background";
import TypewriterText from "@components/TypewriterText";
import HeroImage from "@/assets/hero-image.png";

const DottedGlowBackgroundDemoSecond = () => {
  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center px-4">
      <DottedGlowBackground
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-100"
        opacity={1}
        gap={10}
        radius={1.6}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-600"
        colorDarkVar="--color-neutral-500"
        glowColorDarkVar="--color-sky-800"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-[10rem] font-bold text-white">
          {" "}
          Dina
        </h1>
        <p className="text-white text-sm m-8">
          Where clinical expertise meets your personal skin journey.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <img
          src={HeroImage}
          alt="Hero Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 className="text-4xl md:text-5xl lg:text-[8rem] font-bold text-red-500">
          Derm
        </h1>
        <p className="text-white text-sm m-8">
          Personalized skincare, powered by dermatological science.
        </p>
      </div>
    </div>
  );
};

export default DottedGlowBackgroundDemoSecond;
