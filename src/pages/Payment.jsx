import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ground, selectedDate, selectedSlots = [], duration, totalAmount } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');

  if (!ground) {
    return (
      <div className="payment-error">
        <h2>No payment information found</h2>
        <button onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    );
  }

  const handlePayNow = async () => {
    try {
      const token = localStorage.getItem('sportify_token');
      const res = await fetch('https://mern-project-back-0ohs.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ground: ground._id || ground.id,
          date: selectedDate,
          slots: selectedSlots,
          duration,
          totalAmount,
          customerDetails: location.state?.customer
        })
      });
      const data = await res.json();
      
      if (res.ok) {
        setBookingId(data._id);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/my-bookings');
        }, 3000);
      } else {
        alert(data.message || 'Failed to create booking');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while processing payment');
    }
  };

  const closePopup = () => {
    setShowSuccess(false);
    navigate('/my-bookings');
  };

  return (
    <div className="payment-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="payment-container">
          <h1 className="payment-title">Secure Payment</h1>
          
          <div className="payment-content">
            {/* Left Side - Booking Summary */}
            <div className="payment-summary">
              <h3>Booking Summary</h3>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Ground:</span>
                  <strong>{ground.name}</strong>
                </div>
                <div className="summary-row">
                  <span>Location:</span>
                  <span>{ground.location}</span>
                </div>
                <div className="summary-row">
                  <span>Date:</span>
                  <span>{selectedDate}</span>
                </div>
                <div className="summary-row">
                  <span>Time:</span>
                  <span>{selectedSlots.join(', ')}</span>
                </div>
                <div className="summary-row">
                  <span>Duration:</span>
                  <span>{duration} hour(s)</span>
                </div>
                <div className="summary-row total">
                  <span>Total Amount:</span>
                  <strong>₹{totalAmount}</strong>
                </div>
              </div>
            </div>

            {/* Right Side - Payment Methods */}
            <div className="payment-methods">
              <h3>Select Payment Method</h3>
              
              <div className="method-options">
                <label className={`method-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="method-icon">📱</span>
                  <span>UPI (Google Pay, PhonePe, etc.)</span>
                </label>

                <label className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="method-icon">💳</span>
                  <span>Credit / Debit Card</span>
                </label>

                <label className={`method-option ${paymentMethod === 'netbanking' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="method-icon">🏦</span>
                  <span>Net Banking</span>
                </label>
              </div>

              {paymentMethod === 'upi' && (
                <div className="payment-details">
                  <label>UPI ID</label>
                  <input type="text" placeholder="yourname@upi" className="payment-input" />
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="payment-details">
                  <label>Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" className="payment-input" />
                  <div className="card-row">
                    <div>
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="payment-input small" />
                    </div>
                    <div>
                      <label>CVV</label>
                      <input type="password" placeholder="123" className="payment-input small" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="payment-details">
                  <label>Select Bank</label>
                  <select className="payment-select">
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                  </select>
                </div>
              )}

              <button onClick={handlePayNow} className="pay-now-btn">
                Pay ₹{totalAmount} Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup Modal */}
      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-icon">✅</div>
            <h2>Payment Successful!</h2>
            <p>Your booking has been confirmed.</p>
            <p className="popup-details">Booking ID: {bookingId}</p>
            <p className="popup-small">A confirmation email has been sent.</p>
            <button onClick={closePopup} className="popup-btn">View My Bookings</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
