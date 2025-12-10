import React, { useEffect, useRef } from "react";

export default function LocationPicker({ onSelect }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 28.6139, lng: 77.2090 }, // Default Delhi location
      zoom: 15,
    });

    let marker = new window.google.maps.Marker({
      position: map.getCenter(),
      map: map,
      draggable: true,
    });

    // When marker drag stops → get position
    marker.addListener("dragend", async () => {
      const lat = marker.getPosition().lat();
      const lng = marker.getPosition().lng();

      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_API_KEY`
      );

      const data = await res.json();

      const address = data.results[0]?.formatted_address || "";

      onSelect({
        lat,
        lng,
        address,
      });
    });
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    ></div>
  );
}
