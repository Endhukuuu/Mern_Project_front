import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SearchBar.css';

const SearchBar = ({ placeholder = "Search for grounds, locations, or sports..." }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(`https://mern-project-back-0ohs.onrender.com/api/grounds?search=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.slice(0, 5)); // show top 5
        }
      } catch (err) {
        console.error('Search error', err);
      }
    };
    
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      navigate(`/sports?search=${encodeURIComponent(query)}`);
    }
  };

  const handleSelectSuggestion = (groundId) => {
    setShowDropdown(false);
    navigate(`/ground/${groundId}`);
  };

  return (
    <div className="search-bar-container" ref={dropdownRef} style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <form className="search-bar" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input-field"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
          />
          <button type="submit" className="search-submit-btn">Search</button>
        </div>
      </form>
      
      {showDropdown && suggestions.length > 0 && (
        <div className="search-suggestions dropdown-menu show w-100 mt-1 shadow-lg" style={{ position: 'absolute', zIndex: 1000, borderRadius: '12px', border: 'none' }}>
          {suggestions.map(ground => (
            <div 
              key={ground._id} 
              className="dropdown-item d-flex align-items-center py-2 px-3 border-bottom"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSelectSuggestion(ground._id)}
            >
              <img src={ground.image} alt={ground.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px', marginRight: '12px' }} />
              <div>
                <div className="fw-bold text-dark">{ground.name}</div>
                <div className="text-muted" style={{ fontSize: '0.8rem' }}>📍 {ground.location} • {ground.sportName}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
