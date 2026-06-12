import React from 'react';
import '../css/Booking.css';

const BookingSummary = ({ ground, date, timeSlot, duration, totalAmount }) => {
  return (
    <div className="booking-summary">
      <h3>Booking Summary</h3>
      <div className="summary-details">
        <div className="summary-row">
          <span className="summary-label">Ground:</span>
          <span className="summary-value">{ground?.name}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Location:</span>
          <span className="summary-value">{ground?.location}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Date:</span>
          <span className="summary-value">{date}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Time Slot:</span>
          <span className="summary-value">{timeSlot}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Duration:</span>
          <span className="summary-value">{duration} hour(s)</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Price per hour:</span>
          <span className="summary-value">${ground?.pricePerHour}</span>
        </div>
        <div className="summary-row total-row">
          <span className="summary-label">Total Amount:</span>
          <span className="summary-value total-amount">${totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
