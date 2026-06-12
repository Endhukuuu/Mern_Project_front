import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Sports.css';

const SportCard = ({ sport }) => {
  const navigate = useNavigate();

  const handleViewGrounds = () => {
    navigate('/sports', { state: { category: sport.name } });
  };

  return (
    <div className="sport-card">
      <div className="sport-card-image">
        <img src={sport.image} alt={sport.name} />
        <div className="sport-card-overlay">
          <button onClick={handleViewGrounds} className="quick-view-btn">
            View Grounds →
          </button>
        </div>
      </div>
      <div className="sport-card-content">
        <h3 className="sport-name">{sport.name}</h3>
        <button onClick={handleViewGrounds} className="view-grounds-btn">
          Explore Grounds
        </button>
      </div>
    </div>
  );
};

export default SportCard;
