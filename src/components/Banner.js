import React from "react";

export default function Banner() {
  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      {/* --- AUTO SLIDING CAROUSEL --- */}
      <div
        style={{
          width: "100%",
          height: "300px",
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200"
          alt="banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            animation: "slide 12s infinite",
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200"
          alt="banner2"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            animation: "slide2 12s infinite",
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1518541466316-91f3d1b6b2b1?q=80&w=1200"
          alt="banner3"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            animation: "slide3 12s infinite",
          }}
        />
      </div>

      {/* --- 3 GRID BANNERS (Flipkart Style) --- */}
      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px",
        }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              height: "180px",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={`https://source.unsplash.com/random/800x60${i}`}
              alt="grid"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {/* --- TEXT + BUTTON BANNER --- */}
      <div
        style={{
          marginTop: "25px",
          height: "220px",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "30px",
          color: "white",
          textShadow: "0 2px 6px rgba(0,0,0,0.6)",
        }}
      >
        <h2 style={{ fontSize: "30px", margin: 0 }}>Mega Offer Today!</h2>
        <p style={{ fontSize: "18px", margin: "8px 0" }}>Upto 70% off on Electronics</p>
        <button
          style={{
            width: "150px",
            padding: "10px 16px",
            fontSize: "16px",
            background: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "8px",
          }}
        >
          Shop Now
        </button>
      </div>

      {/* --- CAROUSEL ANIMATION KEYFRAMES --- */}
      <style>
        {`
          @keyframes slide {
            0% { opacity: 1; }
            33% { opacity: 0; }
            100% { opacity: 0; }
          }
          @keyframes slide2 {
            0% { opacity: 0; }
            33% { opacity: 1; }
            66% { opacity: 0; }
            100% { opacity: 0; }
          }
          @keyframes slide3 {
            0% { opacity: 0; }
            66% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
