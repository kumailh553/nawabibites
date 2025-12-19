import React from "react";
import "./Banner.css";
import Banner1 from "../assets/Banner1.webp";


export default function Banner() {

  // Custom images for 3 grid banners
  const gridImages = [
    "https://i.ibb.co/Y7xDF0Xn/classic.webp",  // Image 1
    "https://i.ibb.co/Y6pBdWf/20251130-235013.webp",  // Image 2
    "https://i.ibb.co/SXPthp6Z/20251130-235147.webp"   // Image 3
  ];


  return (
    <div className="banner-wrapper">

      {/* MAIN AUTO SLIDER */}
      <div className="hero-slider">
        <img
          src={Banner1}
          alt="banner"
          className="slide slide1"
        />



        <img
          src={Banner1}
          alt="banner2"
          className="slide slide2"
        />

        <img
          src={Banner1}
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
        <h2>Christmas Mega Offer Today!</h2>
        <p>🛒 Buy 3 Get 1 FREE</p>
        <button>Shop Now</button>
      </div>
    </div>
  );
}
