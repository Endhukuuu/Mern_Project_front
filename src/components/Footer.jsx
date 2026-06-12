import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">⚽ Book Your Sport</h3>
          <p className="footer-description">
            Your one-stop platform for booking sports grounds and courts. Play your favorite sport anytime, anywhere.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/sports">Sports</a></li>
            <li><a href="/my-bookings">My Bookings</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="footer-contact">
            <li>📍 123 Sports Avenue, NY 10001</li>
            <li>📞 +1 234 567 8900</li>
            <li>✉️ support@bookyoursport.com</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <span>📘</span>
            <span>🐦</span>
            <span>📷</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Book Your Sport. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
