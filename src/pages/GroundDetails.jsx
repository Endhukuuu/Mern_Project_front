import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LocationButton from '../components/LocationButton';
import ReviewCard from '../components/ReviewCard';
import TimeSlotSelector from '../components/TimeSlotSelector';
import { availableTimeSlots, getReviewsForGround } from '../data/data';
import '../css/GroundDetails.css';

const GroundDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [ground, setGround] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    const fetchGround = async () => {
      try {
        const res = await fetch(`https://mern-project-back-0ohs.onrender.com/api/grounds/${id}`);
        if (res.ok) {
          const data = await res.json();
          setGround(data);
        }
      } catch (err) {
        console.error('Failed to fetch ground details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGround();
  }, [id]);

  useEffect(() => {
    if (selectedDate && ground) {
      const fetchBookedSlots = async () => {
        try {
          const res = await fetch(`https://mern-project-back-0ohs.onrender.com/api/bookings/slots/${id}/${selectedDate}`);
          if (res.ok) {
            const data = await res.json();
            setBookedSlots(data);
            // Clear any selected slots that are now booked
            setSelectedSlots(prev => prev.filter(slot => !data.includes(slot)));
          }
        } catch (err) {
          console.error('Failed to fetch booked slots', err);
        }
      };
      fetchBookedSlots();
    } else {
      setBookedSlots([]);
    }
  }, [selectedDate, id, ground]);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading ground details...</div>;
  }

  if (!ground) {
    return (
      <div className="ground-details error">
        <h2>Ground not found</h2>
        <button onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    );
  }

  // We keep dummy reviews since we don't have a reviews backend yet
  const reviews = getReviewsForGround(1); // Just get some dummy reviews

  const handleBookNow = () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    if (selectedSlots.length === 0) {
      alert('Please select at least one time slot');
      return;
    }
    navigate('/booking/' + ground._id, {
      state: {
        ground,
        selectedDate,
        selectedSlots
      }
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="ground-details-page">
      <div className="container-full">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        {/* Image Gallery */}
        <div className="gallery-section">
          <div className="main-image">
            <img src={ground.gallery?.length ? ground.gallery[selectedImage] : ground.image} alt={ground.name} />
          </div>
          {ground.gallery?.length > 1 && (
            <div className="thumbnail-list">
              {ground.gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${ground.name} ${idx + 1}`}
                  className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="details-grid">
          {/* Left Column - Info */}
          <div className="details-info">
            <h1 className="ground-title">{ground.name}</h1>
            <div className="ground-meta">
              <span className="ground-location">📍 {ground.location}</span>
              <span className="ground-rating">⭐ {ground.rating} ({ground.reviewCount} reviews)</span>
            </div>
            <div className="ground-price">
              💰 ₹{ground.pricePerHour} <span>/ hour</span>
            </div>
            
            <div className="ground-description">
              <h3>About this ground</h3>
              <p>{ground.description || 'No description available.'}</p>
            </div>

            <div className="ground-sport">
              <strong>Sport:</strong> {ground.sportName}
            </div>

            {/* Facilities */}
            {ground.facilities?.length > 0 && (
              <div className="facilities-section">
                <h3>Facilities</h3>
                <div className="facilities-grid">
                  {ground.facilities.map((facility, idx) => (
                    <div key={idx} className="facility-item">
                      <span className="facility-icon">✓</span>
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Button */}
            <div className="location-section">
              {ground.mapsLink ? (
                <a href={ground.mapsLink} target="_blank" rel="noopener noreferrer" className="location-btn">
                  📍 View on Google Maps
                </a>
              ) : (
                <LocationButton locationName={ground.name} address={ground.location} />
              )}
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
              <h3>Customer Reviews</h3>
              <div className="reviews-summary">
                <div className="average-rating">
                  <span className="rating-number">{ground.rating}</span>
                  <span className="rating-stars">★★★★★</span>
                  <span className="rating-count">Based on {ground.reviewCount} reviews</span>
                </div>
              </div>
              <div className="reviews-list">
                {reviews.length > 0 ? (
                  reviews.map(review => <ReviewCard key={review.id} review={review} />)
                ) : (
                  <p className="no-reviews">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="booking-sidebar">
            <div className="booking-card">
              <h3>Book This Ground</h3>
              <div className="booking-form">
                <div className="form-group">
                  <label>Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={today}
                    className="date-input"
                  />
                </div>
                
                {/* Professional Time Slot Selector */}
                <TimeSlotSelector 
                  slots={availableTimeSlots}
                  selectedSlots={selectedSlots}
                  onSelectSlots={setSelectedSlots}
                  bookedSlots={bookedSlots}
                  selectedDate={selectedDate}
                />
                
                <button onClick={handleBookNow} className="book-now-large">
                  Proceed to Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroundDetails;
