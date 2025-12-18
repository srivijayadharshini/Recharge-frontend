import { useState, useEffect } from "react";

import icon1 from "../assets/features/lightning.png";
import icon2 from "../assets/features/recharge.png";
import icon3 from "../assets/features/clock.png";
import icon4 from "../assets/features/headset.png";
import icon5 from "../assets/features/message.png";
import icon6 from "../assets/features/calendar.png";

export default function FeatureSlider() {
  const slides = [
    {
      title: "Lightning Fast Recharge",
      desc: "Top up any number in seconds.",
      icons: [icon1, icon2, icon3],
    },
    {
      title: "24/7 Customer Support",
      desc: "We're here to help, anytime, anywhere.",
      icons: [icon4, icon5, icon6],
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full bg-black/60 rounded-xl p-8 text-center text-[#ffd978] shadow-xl relative overflow-hidden h-72">

      {/* Slider Content */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-3xl font-bold">{slide.title}</h1>
          <p className="text-white mt-2">{slide.desc}</p>

          {/* Icons */}
          <div className="flex justify-center gap-6 mt-8">
            {slide.icons.map((icon, idx) => (
              <div
                key={idx}
                className="border border-[#ffd978] p-4 rounded-xl w-20 h-20 flex items-center justify-center"
              >
                <img src={icon} className="w-10 h-10" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
