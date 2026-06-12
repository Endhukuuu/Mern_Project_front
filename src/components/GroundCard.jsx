import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

const GroundCard = ({ ground }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/ground/${ground.id}`);
  };

  return (
    <div className="ground-card">
      <div className="ground-card-image">
        <img src={ground.image} alt={ground.name} />
        <div className="ground-card-overlay">
          <button onClick={handleBookNow} className="quick-book-btn">
            Quick Book
          </button>
        </div>
      </div>
      <div className="ground-card-content">
        <h3 className="ground-name">{ground.name}</h3>
        <p className="ground-location">📍 {ground.location}</p>
        <div className="ground-price-rating">
          <p className="ground-price">💰 ${ground.pricePerHour}<span>/hour</span></p>
          <div className="ground-rating">⭐ {ground.rating}</div>
        </div>
        <button onClick={handleBookNow} className="book-now-btn">
          Book Now →
        </button>
      </div>
    </div>
  );
};

export default GroundCard;
