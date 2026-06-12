import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: '',
    phone: '',
    password: ''
  });
  
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  useEffect(() => {
    if (user) {
      setEditForm({
        fullName: user.fullName || '',
        phone: user.phone || '',
        password: ''
      });
    }
  }, [user]);

  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user && activeTab === 'bookings') {
      const fetchBookings = async () => {
        setLoadingBookings(true);
        try {
          const token = localStorage.getItem('sportify_token');
          const res = await fetch('http://localhost:5001/api/bookings/my-bookings', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            // Just filter completed/cancelled for "Past Bookings" history
            const today = new Date();
            const pastBookings = data.filter(b => {
              if (b.status === 'cancelled') return true;
              const bDate = new Date(b.date);
              return bDate < today;
            });
            setBookings(pastBookings);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingBookings(false);
        }
      };
      fetchBookings();
    }
  }, [user, activeTab]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('sportify_token');
      const bodyData = { fullName: editForm.fullName, phone: editForm.phone };
      if (editForm.password) bodyData.password = editForm.password;

      const res = await fetch('http://localhost:5001/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bodyData)
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        localStorage.setItem('sportify_token', data.token);
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  const handleChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <h1 className="profile-title">My Profile {user.role === 'admin' ? '(Admin)' : ''}</h1>
          <button onClick={() => navigate('/')} className="back-home-btn">← Back to Home</button>
        </div>

        {/* Main Grid */}
        <div className="profile-grid">
          {/* Left Column - User Info */}
          <div className="profile-card user-card">
            <div className="user-avatar">
              <img src="https://ui-avatars.com/api/?name=User&background=2563eb&color=fff" alt={user.fullName} />
            </div>
            {isEditing ? (
              <form onSubmit={handleEditSubmit} className="edit-profile-form">
                <input type="text" name="fullName" value={editForm.fullName} onChange={handleChange} required placeholder="Full Name" />
                <input type="text" name="phone" value={editForm.phone} onChange={handleChange} required placeholder="Phone Number" />
                <input type="password" name="password" value={editForm.password} onChange={handleChange} placeholder="New Password (Optional)" />
                <div className="form-actions">
                  <button type="submit" className="save-btn">Save</button>
                  <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="user-name">{user.fullName}</h2>
                <p className="user-email">{user.email}</p>
                <p className="user-phone">{user.phone}</p>
                <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
              </>
            )}
          </div>

          {/* Right Column - Stats & Activities */}
          <div className="profile-right">
            <div className="profile-tabs">
              <button 
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                Previous Bookings
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-content">
                  <h3>About</h3>
                  <p>Welcome to Sportify Arena, {user.fullName}! {user.role === 'admin' ? 'You have administrative privileges to manage the platform.' : 'You can book your favorite grounds and view your history here.'}</p>
                  {user.role === 'admin' && (
                    <button onClick={() => navigate('/admin')} className="admin-dashboard-btn" style={{ marginTop: '20px', padding: '10px 20px', background: '#111827', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                      Go to Admin Dashboard
                    </button>
                  )}
                </div>
              )}
              
              {activeTab === 'bookings' && (
                <div className="bookings-content">
                  <h3>Previous Bookings</h3>
                  {loadingBookings ? <p>Loading history...</p> : (
                    bookings.length > 0 ? (
                      <div className="booking-history-list">
                        {bookings.map(b => (
                          <div key={b._id} className="history-item p-3 mb-3 border rounded shadow-sm bg-white text-dark">
                            <div className="d-flex justify-content-between">
                              <strong>{b.ground?.name || 'Unknown Ground'}</strong>
                              <span className={`badge ${b.status === 'cancelled' ? 'bg-danger' : 'bg-success'}`}>
                                {b.status.toUpperCase()}
                              </span>
                            </div>
                            <div className="text-muted small mt-1">
                              Date: {new Date(b.date).toLocaleDateString()} | Slot: {b.slots.join(', ')}
                            </div>
                            <div className="mt-2 fw-bold text-primary">₹{b.totalAmount}</div>
                          </div>
                        ))}
                      </div>
                    ) : <p>No past bookings found.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
