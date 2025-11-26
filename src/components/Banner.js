import React from "react";
import "./Banner.css";

export default function Banner() {

  // Custom images for 3 grid banners
  const gridImages = [
    "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200",  // Image 1
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1200",  // Image 2
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1200"   // Image 3
  ];

  return (
    <div className="banner-wrapper">

      {/* MAIN AUTO SLIDER */}
      <div className="hero-slider">
        <img
          src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200"
          alt="banner"
          className="slide slide1"
        />

        <img
          src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200"
          alt="banner2"
          className="slide slide2"
        />

        <img
          src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200"
          alt="banner3"
          className="slide slide3"
        />
      </div>

      {/* 3 GRID BANNERS (now with your own images) */}
      <div className="grid-banners">
        {gridImages.map((img, index) => (
          <div className="grid-card" key={index}>
            <img src={img} alt={`grid-${index}`} />
          </div>
        ))}
      </div>

      {/* TEXT PROMO BANNER */}
      <div className="offer-banner">
        <h2>Mega Offer Today!</h2>
        <p>Upto 70% off on Mathri</p>
        <button>Shop Now</button>
      </div>
    </div>
  );
}
