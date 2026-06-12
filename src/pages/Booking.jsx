import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookingSummary from '../components/BookingSummary';
import '../css/Booking.css';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ground, selectedDate, selectedSlots = [] } = location.state || {};
  const { user } = useAuth();

  const duration = Math.max(selectedSlots.length, 1);
  const [phone, setPhone] = useState(user?.phone || '');
  const [specialRequests, setSpecialRequests] = useState('');

  if (!ground) {
    return (
      <div className="booking-error">
        <h2>No booking information found</h2>
        <button onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    );
  }

  const totalAmount = ground.pricePerHour * duration;

  const handleConfirmBooking = () => {
    if (!phone) {
      alert('Please provide a contact phone number');
      return;
    }
    navigate('/payment', {
      state: {
        ground,
        selectedDate,
        selectedSlots,
        duration,
        totalAmount,
        customer: { 
          name: user?.fullName || 'Guest', 
          email: user?.email || '', 
          phone, 
          specialRequests 
        }
      }
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="booking-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="booking-container">
          <h1 className="booking-title">Complete Your Booking</h1>
          
          <div className="booking-content">
            {/* Left Side - Booking Summary */}
            <div className="booking-summary-section">
              <BookingSummary 
                ground={ground}
                date={selectedDate}
                timeSlot={selectedSlots.join(', ')}
                duration={duration}
                totalAmount={totalAmount}
              />
            </div>

            {/* Right Side - Booking Form */}
            <div className="booking-form-section">
              <div className="booking-details-form">
                <h3>Your Details</h3>
                {user && (
                  <div className="alert alert-info py-2 px-3 mb-4 rounded-3 d-flex align-items-center" style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1E40AF' }}>
                    <span className="me-2">ℹ️</span>
                    <span>Booking as <strong>{user.fullName}</strong> ({user.email})</span>
                  </div>
                )}
                
                <div className="form-group">
                  <label>Phone Number (For this booking) *</label>
                  <input 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Duration (Automatically calculated) *</label>
                  <input 
                    type="text" 
                    value={`${duration} hour${duration > 1 ? 's' : ''}`}
                    className="form-input"
                    readOnly
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label>Special Requests (Optional)</label>
                  <textarea 
                    rows="3" 
                    placeholder="Any special requirements or requests..."
                    className="form-textarea"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  ></textarea>
                </div>

                <div className="price-update">
                  <span>Total to pay:</span>
                  <strong>₹{totalAmount}</strong>
                </div>

                <button onClick={handleConfirmBooking} className="confirm-booking-btn">
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
