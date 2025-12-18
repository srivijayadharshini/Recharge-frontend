import { useState, useEffect } from "react";

// SLIDES
import slide1 from "../../assets/slide1.jpg";
import slide2 from "../../assets/slide2.png";
import slide3 from "../../assets/slide3.jpg";

export default function ImageSlider() {
  const slides = [slide1, slide2, slide3];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full overflow-hidden rounded-xl shadow-2xl relative h-[400px]">
      {slides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Promotional slide ${i + 1}`}
          loading="lazy"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
            i === index 
              ? "opacity-100 transform scale-100" 
              : "opacity-0 transform scale-105"
          }`}
        />
      ))}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent" />
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === index 
                ? "bg-gray-100 w-6" 
                : "bg-gray-400 hover:bg-gray-300"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}