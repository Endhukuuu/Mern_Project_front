import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Sports.css';

const Sports = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';
  
  const [activeTab, setActiveTab] = useState(location.state?.category || 'All');
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const res = await fetch('https://mern-project-back-0ohs.onrender.com/api/grounds');
        if (res.ok) {
          const data = await res.json();
          setGrounds(data);
        }
      } catch (err) {
        console.error('Failed to fetch grounds', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGrounds();
  }, []);

  const sportsTabs = ['All', ...new Set(grounds.map(g => g.sportName))];

  const filteredGrounds = grounds.filter(ground => {
    const matchesTab = activeTab === 'All' || ground.sportName === activeTab;
    const matchesSearch = ground.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ground.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="sports-page">
      <div className="container-full">
        <div className="selected-sport-banner">
          <h2>Explore Sports Venues</h2>
          <p>Find and book the perfect ground for your next game</p>
          
          <div className="d-flex justify-content-center mt-4">
            <div className="position-relative w-50">
              <input 
                type="text" 
                placeholder="Search by venue name or location..." 
                className="form-control form-control-lg rounded-pill px-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container-full">
        <div className="sport-filter-bar">
          {sportsTabs.map(tab => (
            <button 
              key={tab} 
              className={`filter-chip ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading grounds...</div>
        ) : filteredGrounds.length > 0 ? (
          <div className="grounds-grid mt-4">
            {filteredGrounds.map(ground => (
              <div key={ground._id} className="sport-card card shadow-sm border-0" onClick={() => navigate(`/ground/${ground._id}`)} style={{ cursor: 'pointer' }}>
                <div className="sport-card-image">
                  <img src={ground.image} alt={ground.name} className="card-img-top" style={{ height: '220px', objectFit: 'cover' }} />
                  <span className="badge bg-primary position-absolute top-0 end-0 m-3 fs-6 px-3 py-2 rounded-pill shadow">₹{ground.pricePerHour}/hr</span>
                  <div className="sport-card-overlay">
                    <button className="quick-view-btn">View Details →</button>
                  </div>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title fw-bold text-dark mb-0 text-truncate" style={{ maxWidth: '80%' }}>{ground.name}</h5>
                    <div className="text-warning fw-bold d-flex align-items-center gap-1">
                      ⭐ {ground.rating}
                    </div>
                  </div>
                  <p className="card-text text-muted mb-4 d-flex align-items-center gap-2">
                    <span className="fs-5">📍</span> {ground.location}
                  </p>
                  
                  <div className="mb-4 d-flex flex-wrap gap-2">
                    {ground.facilities.slice(0, 3).map((facility, index) => (
                      <span key={index} className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-normal">{facility}</span>
                    ))}
                    {ground.facilities.length > 3 && (
                      <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-normal">+{ground.facilities.length - 3}</span>
                    )}
                  </div>
                  
                  <div className="mt-auto">
                    <button className="btn btn-primary view-grounds-btn rounded-pill py-3 fw-bold shadow-sm">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-grounds">
            <h3>No venues found</h3>
            <p>We couldn't find any venues matching your criteria.</p>
            <button onClick={() => {setSearchTerm(''); setActiveTab('All');}} className="reset-filters-btn">
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sports;
