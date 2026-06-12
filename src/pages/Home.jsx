import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SportCard from '../components/SportCard';
import SearchBar from '../components/SearchBar';
import '../css/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  
  const [allGrounds, setAllGrounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/grounds');
        if (res.ok) {
          const data = await res.json();
          setAllGrounds(data);
        }
      } catch (err) {
        console.error('Failed to fetch grounds', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGrounds();
  }, []);

  const sportOptions = ['All', ...new Set(allGrounds.map(g => g.sportName))];
  
  const filteredGrounds = allGrounds.filter(ground => {
    const matchesSearch = ground.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ground.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSport === '' || selectedSport === 'All' || ground.sportName === selectedSport;
    return matchesSearch && matchesSport;
  });

  const popularGrounds = [...allGrounds].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const featuredGrounds = [...allGrounds].sort((a, b) => b.rating - a.rating).slice(0, 3);

  const steps = [
    { icon: '🔍', title: 'Search', desc: 'Find your favorite sport and ground' },
    { icon: '📅', title: 'Choose Slot', desc: 'Select date and time that suits you' },
    { icon: '💳', title: 'Book & Pay', desc: 'Secure payment & instant confirmation' },
    { icon: '🎯', title: 'Play!', desc: 'Show up and enjoy your game' }
  ];

  const testimonials = [
    { name: 'Rahul Mehta', role: 'Cricket Enthusiast', text: 'Amazing platform! Booked Greenfield Stadium easily. Highly recommended.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Priya Sharma', role: 'Badminton Player', text: 'Smooth booking process. The courts are well maintained. Will use again!', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Amit Kumar', role: 'Football Captain', text: 'Best sports booking app in town. Love the slot selection feature.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }
  ];

  const getSportImage = (sportName) => {
    switch (sportName.toLowerCase()) {
      case 'badminton': return 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800';
      case 'cricket': return 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800';
      case 'football': return 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800';
      case 'box cricket': return 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800';
      case 'multi-sport': return 'https://images.unsplash.com/photo-1526624215-62bb8cf19623?w=800';
      default: return 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800';
    }
  };

  const uniqueSports = [...new Set(allGrounds.map(g => g.sportName))].map((sportName, idx) => ({
    id: idx,
    name: sportName,
    icon: '🏆', 
    image: getSportImage(sportName)
  }));

  const renderGroundCard = (ground) => (
    <div key={ground._id} className="col">
      <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => navigate(`/ground/${ground._id}`)} onMouseOver={e => e.currentTarget.style.transform='translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform='translateY(0)'}>
        <div style={{ position: 'relative' }}>
          <img src={ground.image} alt={ground.name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
          <span className="badge bg-primary position-absolute top-0 end-0 m-3 fs-6">₹{ground.pricePerHour}/hr</span>
        </div>
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="card-title fw-bold text-dark mb-0 text-truncate" style={{ maxWidth: '70%' }}>{ground.name}</h5>
            <div className="text-warning fw-bold">
              ★ {ground.rating} <span className="text-muted fw-normal" style={{ fontSize: '0.8rem' }}>({ground.reviewCount})</span>
            </div>
          </div>
          <p className="card-text text-muted mb-3"><small>📍 {ground.location}</small></p>
          <div className="mt-auto d-flex justify-content-between align-items-center">
            <span className="badge bg-secondary text-white py-2 px-3">{ground.sportName}</span>
            <button className="btn btn-primary fw-bold px-4" style={{ borderRadius: '25px' }}>Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Play More, Book Smarter</h1>
          <p className="hero-subtitle">Find and book the best sports grounds near you</p>
          <SearchBar />
          <button onClick={() => navigate('/sports')} className="hero-btn">
            Explore All Grounds
          </button>
        </div>
      </section>

      {/* Sports Categories */}
      <section className="sports-section">
        <div className="container">
          <h2 className="section-title">Sports Categories</h2>
          <div className="sports-grid">
            {uniqueSports.map((sport) => (
              <SportCard key={sport.id} sport={sport} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Grounds */}
      <section className="popular-grounds">
        <div className="container">
          <h2 className="section-title">Popular Grounds</h2>
          {loading ? <p style={{ textAlign: 'center' }}>Loading...</p> : (
            popularGrounds.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {popularGrounds.map(renderGroundCard)}
              </div>
            ) : <p style={{ textAlign: 'center' }}>No grounds found.</p>
          )}
        </div>
      </section>

      {/* Top Rated Grounds */}
      <section className="top-rated">
        <div className="container">
          <h2 className="section-title">Top Rated Grounds</h2>
          {loading ? <p style={{ textAlign: 'center' }}>Loading...</p> : (
            featuredGrounds.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {featuredGrounds.map(renderGroundCard)}
              </div>
            ) : <p style={{ textAlign: 'center' }}>No grounds found.</p>
          )}
        </div>
      </section>

      {/* Why Choose */}
      <section className="why-choose">
        <div className="container">
          <h2 className="section-title">Why Choose Sportify Arena</h2>
          <div className="features-grid">
            <div className="feature-card"><div className="feature-icon">✅</div><h3>Easy Booking</h3></div>
            <div className="feature-card"><div className="feature-icon">💰</div><h3>Best Prices</h3></div>
            <div className="feature-card"><div className="feature-icon">🕐</div><h3>24/7 Support</h3></div>
            <div className="feature-card"><div className="feature-icon">⭐</div><h3>Verified Grounds</h3></div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="search-section">
        <div className="container">
          <h2 className="section-title">Find Your Ground</h2>
          <div className="search-filters">
            <input type="text" placeholder="Search by name or location..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <select className="filter-select" value={selectedSport} onChange={(e) => setSelectedSport(e.target.value)}>
              {sportOptions.map(sport => <option key={sport} value={sport}>{sport}</option>)}
            </select>
          </div>
          {loading ? <p style={{ textAlign: 'center' }}>Loading...</p> : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {filteredGrounds.length > 0 ? filteredGrounds.map(renderGroundCard) : <p className="no-results w-100 text-center">No grounds found.</p>}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
