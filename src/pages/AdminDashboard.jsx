import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  
  const [bookings, setBookings] = useState([]);
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state for new ground
  const [newGround, setNewGround] = useState({
    name: '', location: '', sportName: '', pricePerHour: '', description: '', mapsLink: ''
  });
  const [uploadFile, setUploadFile] = useState(null);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('sportify_token');
      const [bookingsRes, groundsRes] = await Promise.all([
        fetch('https://mern-project-back-0ohs.onrender.com/api/bookings/all', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('https://mern-project-back-0ohs.onrender.com/api/grounds')
      ]);

      if (bookingsRes.ok) setBookings(await bookingsRes.json());
      if (groundsRes.ok) setGrounds(await groundsRes.json());
    } catch (err) {
      console.error('Failed to fetch admin data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGround = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('sportify_token');
      let imagePath = '';

      if (uploadFile) {
        const formData = new FormData();
        formData.append('image', uploadFile);

        const uploadRes = await fetch('https://mern-project-back-0ohs.onrender.com/api/upload', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });

        if (uploadRes.ok) {
          imagePath = await uploadRes.text();
        } else {
          alert('Image upload failed!');
          return;
        }
      }

      const res = await fetch('https://mern-project-back-0ohs.onrender.com/api/grounds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...newGround, pricePerHour: Number(newGround.pricePerHour), image: `https://mern-project-back-0ohs.onrender.com${imagePath}` })
      });
      if (res.ok) {
        alert('Ground added successfully!');
        setNewGround({ name: '', location: '', sportName: '', pricePerHour: '', description: '', mapsLink: '' });
        setUploadFile(null);
        fetchData();
      } else {
        alert('Failed to add ground');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteGround = async (id) => {
    if (!window.confirm('Are you sure you want to delete this ground?')) return;
    try {
      const token = localStorage.getItem('sportify_token');
      const res = await fetch(`https://mern-project-back-0ohs.onrender.com/api/grounds/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert('Ground deleted');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdminCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking? (User will get 75% refund if future)')) return;
    try {
      const token = localStorage.getItem('sportify_token');
      const res = await fetch(`https://mern-project-back-0ohs.onrender.com/api/bookings/${bookingId}/cancel`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert('Booking cancelled successfully.');
        fetchData();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to cancel booking');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Admin Dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1 className="admin-title">Admin Dashboard</h1>

        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            All Bookings
          </button>
          <button 
            className={`admin-tab ${activeTab === 'grounds' ? 'active' : ''}`}
            onClick={() => setActiveTab('grounds')}
          >
            Manage Grounds
          </button>
        </div>

        {activeTab === 'bookings' && (
          <div className="bookings-table-container">
            {bookings.length === 0 ? <p>No bookings found.</p> : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Ground</th>
                    <th>Date & Slots</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking._id.slice(-6).toUpperCase()}</td>
                      <td>
                        <div><strong>{booking.user?.fullName || 'Unknown'}</strong></div>
                        <div className="text-sm">{booking.user?.email || ''}</div>
                      </td>
                      <td>{booking.ground?.name || 'Deleted Ground'}</td>
                      <td>
                        <div>{new Date(booking.date).toLocaleDateString()}</div>
                        <div className="text-sm">{booking.slots?.join(', ')}</div>
                      </td>
                      <td>₹{booking.totalAmount}</td>
                      <td><span className={`status-badge ${booking.status}`}>{booking.status}</span></td>
                      <td>
                        {booking.status !== 'cancelled' && (
                          <button onClick={() => handleAdminCancelBooking(booking._id)} className="btn btn-sm btn-outline-danger">Cancel</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'grounds' && (
          <div className="grounds-management">
            <div className="add-ground-form-container">
              <h2>Add New Ground</h2>
              <form onSubmit={handleAddGround} className="add-ground-form">
                <input type="text" placeholder="Ground Name" required value={newGround.name} onChange={e => setNewGround({...newGround, name: e.target.value})} />
                <input type="text" placeholder="Location" required value={newGround.location} onChange={e => setNewGround({...newGround, location: e.target.value})} />
                <input type="text" placeholder="Sport (e.g., Football, Cricket)" required value={newGround.sportName} onChange={e => setNewGround({...newGround, sportName: e.target.value})} />
                <input type="number" placeholder="Price Per Hour ($)" required value={newGround.pricePerHour} onChange={e => setNewGround({...newGround, pricePerHour: e.target.value})} />
                <input type="text" placeholder="Google Maps Link (Optional)" value={newGround.mapsLink} onChange={e => setNewGround({...newGround, mapsLink: e.target.value})} />
                <input type="file" accept="image/*" required onChange={e => setUploadFile(e.target.files[0])} />
                <textarea placeholder="Description" rows="3" value={newGround.description} onChange={e => setNewGround({...newGround, description: e.target.value})}></textarea>
                <button type="submit" className="admin-submit-btn">Add Ground</button>
              </form>
            </div>

            <div className="existing-grounds">
              <h2>Existing Grounds</h2>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-2">
                {grounds.map(ground => (
                  <div key={ground._id} className="col">
                    <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                      <div style={{ position: 'relative' }}>
                        <img src={ground.image} alt={ground.name} className="card-img-top" style={{ height: '150px', objectFit: 'cover' }} />
                        <span className="badge bg-primary position-absolute top-0 end-0 m-2">₹{ground.pricePerHour}/hr</span>
                      </div>
                      <div className="card-body d-flex flex-column p-3">
                        <h6 className="card-title fw-bold text-dark mb-1 text-truncate">{ground.name}</h6>
                        <p className="card-text text-muted mb-3" style={{ fontSize: '0.8rem' }}>📍 {ground.location}</p>
                        <button onClick={() => handleDeleteGround(ground._id)} className="btn btn-danger w-100 mt-auto fw-bold" style={{ borderRadius: '8px' }}>
                          Remove Ground
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
