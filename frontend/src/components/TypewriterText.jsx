"use client";

import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

function TypewriterText({
  words = ["Welcome!", "I build websites.", "I love coding!"],
  loop = true,
}) {
  const [text] = useTypewriter({
    words,
    loop: loop ? 0 : 1, // 0 = infinite loop
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
      {text}
      <Cursor cursorStyle="|" />
    </h1>
  );
}

export default TypewriterText;
