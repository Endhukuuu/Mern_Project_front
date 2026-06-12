import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../css/MyBookings.css';

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('upcoming'); // upcoming, completed, cancelled

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const token = localStorage.getItem('sportify_token');
        const res = await fetch('http://localhost:5001/api/bookings/my-bookings', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const today = new Date();
          
          const enrichedBookings = data.map(booking => {
            let derivedStatus = booking.status.toLowerCase();
            
            if (derivedStatus !== 'cancelled') {
              const bookingDate = new Date(booking.date);
              
              // Determine if it's past
              let isPast = false;
              if (bookingDate.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {
                isPast = true;
              } else if (bookingDate.setHours(0,0,0,0) === today.setHours(0,0,0,0)) {
                if (booking.slots && booking.slots.length > 0) {
                  // Get end time of the last slot
                  const lastSlot = booking.slots[booking.slots.length - 1];
                  const endTimeStr = lastSlot.split(' - ')[1];
                  if (endTimeStr) {
                    const [time, modifier] = endTimeStr.split(' ');
                    let [hours, minutes] = time.split(':');
                    if (hours === '12') hours = '00';
                    if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
                    
                    const endDateTime = new Date(booking.date);
                    endDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                    
                    if (new Date() >= endDateTime) {
                      isPast = true;
                    }
                  }
                }
              }
              
              derivedStatus = isPast ? 'completed' : 'upcoming';
            }
            
            return {
              ...booking,
              groundName: booking.ground?.name || 'Unknown Ground',
              groundImage: booking.ground?.image || '',
              groundLocation: booking.ground?.location || '',
              derivedStatus
            };
          });
          setBookings(enrichedBookings);
        }
      } catch (err) {
        console.error('Failed to fetch bookings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'upcoming') return booking.derivedStatus === 'upcoming';
    if (filter === 'completed') return booking.derivedStatus === 'completed';
    if (filter === 'cancelled') return booking.derivedStatus === 'cancelled';
    return true;
  });

  const getStatusClass = (status) => {
    switch(status) {
      case 'upcoming':
        return 'status-upcoming';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-other';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleViewGround = (groundId) => {
    navigate(`/ground/${groundId}`);
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking? You will receive a 75% refund.')) {
      try {
        const token = localStorage.getItem('sportify_token');
        const res = await fetch(`http://localhost:5001/api/bookings/${bookingId}/cancel`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await res.json();
        if (res.ok) {
          setBookings(prev => prev.map(b => 
            b._id === bookingId ? { ...b, derivedStatus: 'cancelled', status: 'cancelled' } : b
          ));
          toast.success(`Booking cancelled. ₹${data.refundAmount} has been refunded.`);
        } else {
          toast.error(data.message || 'Failed to cancel booking');
        }
      } catch (err) {
        console.error(err);
        toast.error('Network error');
      }
    }
  };

  return (
    <div className="my-bookings-page">
      <div className="container">
        <h1 className="page-title">My Bookings</h1>
        
        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={`filter-tab ${filter === 'cancelled' ? 'active' : ''}`}
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="bookings-list">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-image">
                  <img src={booking.groundImage} alt={booking.groundName} />
                </div>
                <div className="booking-details">
                  <h3 className="booking-ground-name">{booking.groundName}</h3>
                  <p className="booking-location">📍 {booking.groundLocation}</p>
                  <div className="booking-info-grid">
                    <div className="info-item">
                      <span className="info-label">Date:</span>
                      <span>{booking.date}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Time:</span>
                      <span>{booking.slots?.join(', ')}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Duration:</span>
                      <span>{booking.duration} hour(s)</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Amount:</span>
                      <span className="amount">₹{booking.totalAmount}</span>
                    </div>
                    {booking.derivedStatus === 'cancelled' && (
                      <div className="info-item text-danger mt-1">
                        <span className="info-label">Refund:</span>
                        <span className="amount">₹{booking.totalAmount * 0.75} (75%)</span>
                      </div>
                    )}
                  </div>
                  <div className="booking-status">
                    <span className={`status-badge ${getStatusClass(booking.derivedStatus)}`}>
                      {getStatusText(booking.derivedStatus)}
                    </span>
                  </div>
                  <div className="booking-actions">
                    <button 
                      onClick={() => handleViewGround(booking.ground?._id)} 
                      className="view-ground-btn"
                    >
                      View Ground
                    </button>
                    {booking.derivedStatus === 'upcoming' && (
                      <button 
                        onClick={() => handleCancelBooking(booking._id)} 
                        className="cancel-booking-btn"
                      >
                        Cancel Booking
                      </button>
                    )}
                    {booking.derivedStatus === 'completed' && (
                      <button 
                        onClick={() => toast.success('Feedback system coming soon!')} 
                        className="btn btn-outline-primary"
                      >
                        Leave Feedback
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-bookings">
            <div className="no-bookings-icon">📅</div>
            <h3>No {filter} bookings found</h3>
            <p>You haven't made any {filter} bookings yet.</p>
            <button onClick={() => navigate('/sports')} className="book-now-btn">
              Browse Sports
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
