import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Notification from '../components/Notification';
import { getAppointments, saveAppointment, deleteAppointment, formatDate } from '../utils/storage';

const Scheduling = ({ user, onAuthClick, onLogout }) => {
  const [appointments, setAppointments] = useState([]);
  const [notification, setNotification] = useState('');
  const [formData, setFormData] = useState({
    therapy: '',
    datetime: '',
    therapist: '',
    notes: ''
  });

  useEffect(() => {
    loadAppointments();
    setMinDateTime();
  }, []);

  const setMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const minDateTime = now.toISOString().slice(0, 16);
    const datetimeInput = document.getElementById('datetime');
    if (datetimeInput) {
      datetimeInput.min = minDateTime;
    }
  };

  const loadAppointments = () => {
    const appointmentsList = getAppointments();
    setAppointments(appointmentsList.sort((a, b) => new Date(a.datetime) - new Date(b.datetime)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointmentTime = new Date(formData.datetime);
    const now = new Date();

    if (appointmentTime <= now) {
      alert('Please select a future date and time.');
      return;
    }

    const conflict = appointments.find(apt => {
      const existingTime = new Date(apt.datetime);
      const timeDiff = Math.abs(existingTime - appointmentTime);
      return timeDiff < 3600000;
    });

    if (conflict) {
      alert('You have another appointment within 1 hour of this time. Please choose a different slot.');
      return;
    }

    saveAppointment(formData);
    setNotification(`Appointment scheduled for ${formData.therapy} on ${formatDate(formData.datetime)}`);

    setFormData({ therapy: '', datetime: '', therapist: '', notes: '' });
    loadAppointments();
  };

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      deleteAppointment(id);
      loadAppointments();
      setNotification('Appointment cancelled successfully');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="user-panel">
      {/* <div className='navbar-pos'>
       <Navbar user={user} onAuthClick={onAuthClick} onLogout={onLogout} />
     </div> */}

      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification('')}
        />
      )}

      <div className="panel-layout">
        <aside className="panel-sidebar">
          <div className="user-profile">
            <div className="profile-avatar">{user?.avatar}</div>
            <h3>{user?.name}</h3>
            <span className="user-badge">{user?.role}</span>
          </div>

          <nav className="sidebar-nav">
            <Link to="/dashboard" className="nav-item">
              <span className="nav-icon">🏠</span>
              <span>Dashboard</span>
            </Link>
            <Link to="/scheduling" className="nav-item active">
              <span className="nav-icon">📅</span>
              <span>Schedule</span>
            </Link>
            <Link to="/progress" className="nav-item">
              <span className="nav-icon">📈</span>
              <span>Progress</span>
            </Link>
            <Link to="/chatbot" className="nav-item">
              <span className="nav-icon">🤖</span>
              <span>AI Chat</span>
            </Link>
          </nav>
        </aside>

        <main className="panel-content">
          <header className="content-header">
            <div className="header-info">
              <h1>Schedule Therapy</h1>
              <p>Book your healing sessions with our experienced practitioners</p>
            </div>
          </header>

          <div className="scheduling-layout">
            <section className="booking-section">
              <div className="section-header">
                <h2>Book New Appointment</h2>
              </div>

              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="therapy">Therapy Type</label>
                    <select id="therapy" style={{ padding: 10 }} value={formData.therapy} onChange={handleChange} required>
                      <option value="">Select therapy</option>
                      <option value="Abhyanga">Abhyanga - Oil Massage</option>
                      <option value="Shirodhara">Shirodhara - Oil Pouring</option>
                      <option value="Swedana">Swedana - Steam Therapy</option>
                      <option value="Nasya">Nasya - Nasal Therapy</option>
                      <option value="Basti">Basti - Enema Therapy</option>
                      <option value="Virechana">Virechana - Purgation</option>
                      <option value="Vamana">Vamana - Emesis</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="therapist">Therapist</label>
                    <select id="therapist" style={{ padding: 10 }} value={formData.therapist} onChange={handleChange} required>
                      <option value="">Select therapist</option>
                      <option value="Dr. Priya Sharma">Dr. Priya Sharma</option>
                      <option value="Dr. Rajesh Kumar">Dr. Rajesh Kumar</option>
                      <option value="Dr. Meera Patel">Dr. Meera Patel</option>
                      <option value="Dr. Arjun Singh">Dr. Arjun Singh</option>
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="datetime">Date & Time</label>
                    <input
                      style={{ padding: 10 }}
                      type="datetime-local"
                      id="datetime"
                      value={formData.datetime}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="notes">Special Instructions</label>
                    <textarea
                      style={{ padding: 10 }}
                      id="notes"
                      rows="3"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any specific requirements or health conditions..."
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary">
                  Schedule Appointment
                </button>
              </form>
            </section>

            <section className="appointments-section">
              <div className="section-header">
                <h2>Your Appointments</h2>
                <span className="count-badge">{appointments.length}</span>
              </div>

              <div className="appointments-container">
                {appointments.length === 0 ? (
                  <div className="empty-message">
                    <p>No appointments scheduled</p>
                  </div>
                ) : (
                  appointments.map(apt => (
                    <div key={apt.id} className="appointment-item">
                      <div className="appointment-content">
                        <h4>{apt.therapy}</h4>
                        <p>{formatDate(apt.datetime)}</p>
                        <span>Dr. {apt.therapist}</span>
                        {apt.notes && <small>{apt.notes}</small>}
                      </div>
                      <button
                        onClick={() => handleCancel(apt.id)}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Scheduling;