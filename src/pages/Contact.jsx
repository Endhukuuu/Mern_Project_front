import React, { useState } from 'react';
import '../css/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    groundName: '',
    issueType: '',
    customIssue: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const issueOptions = [
    'Booking Issue',
    'Payment Issue',
    'Ground Issue',
    'Refund Issue',
    'Technical Issue',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We're here to help. Send us your feedback or report an issue.</p>
        </div>

        <div className="contact-grid">
          {/* Contact Info Card */}
          <div className="contact-info">
            <h3>Owner Details</h3>
            <div className="info-item bg-light p-3 rounded mb-3 border">
              <span className="info-icon text-primary" style={{ fontSize: '1.5rem' }}>👨‍💼</span>
              <div>
                <strong className="text-dark">Owner</strong>
                <p className="mb-0 text-dark fw-bold">Arelli Anand</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <strong>Direct Phone</strong>
                <p>+91 9898 989898</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div>
                <strong>Admin Email</strong>
                <p>arellianand5@gmail.com</p>
              </div>
            </div>
            <div className="info-item mt-4">
              <span className="info-icon">📍</span>
              <div>
                <strong>Headquarters</strong>
                <p>Hanamkonda, Warangal, Telangana</p>
              </div>
            </div>
            <div className="info-item mt-2">
              <span className="info-icon">⏰</span>
              <div>
                <strong>Support Hours</strong>
                <p>Mon - Sun, 24/7 Support Available</p>
              </div>
            </div>
          </div>

          {/* Complaint Form */}
          <div className="contact-form">
            <h3>Report an Issue / Complaint</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ground Name</label>
                  <input
                    type="text"
                    name="groundName"
                    value={formData.groundName}
                    onChange={handleChange}
                    placeholder="Which ground?"
                  />
                </div>
                <div className="form-group">
                  <label>Issue Type *</label>
                  <select
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select issue type</option>
                    {issueOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {formData.issueType === 'Other' && (
                <div className="form-group">
                  <label>Please specify issue *</label>
                  <input
                    type="text"
                    name="customIssue"
                    value={formData.customIssue}
                    onChange={handleChange}
                    required
                    placeholder="Describe the issue in brief"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Message / Description *</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Provide detailed description of your issue..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Submit Complaint</button>
            </form>

            {submitted && (
              <div className="success-message">
                ✅ Complaint submitted! We'll get back to you within 24 hours.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
