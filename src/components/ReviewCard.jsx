import React from 'react';
import '../css/ReviewCard.css';

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <img 
            src={review.avatar || 'https://ui-avatars.com/api/?background=2563EB&color=fff&name=' + review.name.replace(' ', '+')} 
            alt={review.name}
            className="reviewer-avatar"
          />
          <div>
            <h4 className="reviewer-name">{review.name}</h4>
            <div className="review-rating">{renderStars(review.rating)}</div>
          </div>
        </div>
        <span className="review-date">{review.date}</span>
      </div>
      <p className="review-message">{review.message}</p>
      {review.verified && <span className="verified-badge">✓ Verified Booking</span>}
    </div>
  );
};

export default ReviewCard;
