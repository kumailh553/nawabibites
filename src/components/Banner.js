import React from "react";
import "./Banner.css";

export default function Banner() {

  // Custom images for 3 grid banners
  const gridImages = [
    "https://i.ibb.co/vC7c0JDf/20251130-235429-1.jpg",  // Image 1
    "https://i.ibb.co/4Zy5SfPC/20251130-235013.jpg",  // Image 2
    "https://i.ibb.co/xKsJm86K/20251130-235147-1.jpg"   // Image 3
  ];

  return (
    <div className="banner-wrapper">

      {/* MAIN AUTO SLIDER */}
      <div className="hero-slider">
        <img
          src="https://i.ibb.co/5gsd5tF9/20251210-155642.jpg"
          alt="banner"
          className="slide slide1"
        />

        <img
          src="https://i.ibb.co/5gsd5tF9/20251210-155642.jpg"
          alt="banner2"
          className="slide slide2"
        />

        <img
          src="https://i.ibb.co/5gsd5tF9/20251210-155642.jpg"
          alt="banner3"
          className="slide slide3"
        />
      </div>

<div className="banner123">
<h2 >OUR FLAVOURS</h2>
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
        <p>Buy 2 Get Up To 50% Special discount Scratch Card</p>
        <button>Shop Now</button>
      </div>
    </div>
  );
}
