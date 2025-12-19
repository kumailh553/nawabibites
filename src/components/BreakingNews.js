import React, { useEffect, useState } from "react";
import "./BreakingNews.css";

const offers = [
  "🚚 Free Delivery All Over India",
  "🎉 Flat 25% OFF on All Products",
  "🛒 Buy 3 Get 1 FREE"
];

export default function BreakingNews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % offers.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="breaking-bar">
      <div
        className="breaking-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {offers.map((text, i) => (
          <div className="breaking-item" key={i}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
