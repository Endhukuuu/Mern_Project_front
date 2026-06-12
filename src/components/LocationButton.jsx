import React from 'react';
import '../css/LocationButton.css';

const LocationButton = ({ locationName, address, className = '' }) => {
  const handleOpenMaps = () => {
    // Google Maps URL with the ground's location
    const query = encodeURIComponent(`${locationName}, ${address}`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button 
      className={`location-btn ${className}`}
      onClick={handleOpenMaps}
      aria-label="View on Google Maps"
    >
      <span className="location-icon">📍</span>
      <span>View Location on Map</span>
    </button>
  );
};

export default LocationButton;
