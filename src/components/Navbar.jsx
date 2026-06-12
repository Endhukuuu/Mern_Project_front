import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Navbar.css';
import logoUrl from '../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    if (isAuthenticated) {
      logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logoUrl} alt="Sportify Arena Logo" className="logo-image" />
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </div>

        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sports" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Sports
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/my-bookings" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              My Bookings
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
          {isAuthenticated && (
            <li className="nav-item">
              <Link to="/profile" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>
            </li>
          )}
          {isAuthenticated && user?.role === 'admin' && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ color: '#2563EB', fontWeight: 'bold' }}>
                Admin Dashboard
              </Link>
            </li>
          )}
          <li className="nav-item">
            <button onClick={handleLogin} className="nav-login-btn">
              {isAuthenticated ? 'Logout' : 'Login'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
