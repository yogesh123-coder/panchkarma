import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Notification from '../components/Notification';
import { getProgress, saveProgress, formatDate } from '../utils/storage';

const Progress = ({ user, onAuthClick, onLogout }) => {
  const [progress, setProgress] = useState([]);
  const [notification, setNotification] = useState('');
  const [formData, setFormData] = useState({
    therapy: '',
    rating: '',
    symptoms: '',
    feedback: ''
  });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    const progressData = getProgress();
    setProgress(progressData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const session = {
      ...formData,
      rating: parseInt(formData.rating),
      symptoms: parseInt(formData.symptoms)
    };
    
    saveProgress(session);
    setNotification('Feedback submitted successfully!');
    
    setFormData({ therapy: '', rating: '', symptoms: '', feedback: '' });
    loadProgress();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const calculateStats = () => {
    if (progress.length === 0) return null;
    
    const totalSessions = progress.length;
    const avgRating = (progress.reduce((sum, session) => sum + session.rating, 0) / totalSessions).toFixed(1);
    const avgSymptomRelief = (progress.reduce((sum, session) => sum + session.symptoms, 0) / totalSessions).toFixed(1);
    
    const therapyCount = {};
    progress.forEach(session => {
      therapyCount[session.therapy] = (therapyCount[session.therapy] || 0) + 1;
    });
    
    const mostFrequentTherapy = Object.keys(therapyCount).reduce((a, b) => 
      therapyCount[a] > therapyCount[b] ? a : b
    );
    
    return { totalSessions, avgRating, avgSymptomRelief, mostFrequentTherapy };
  };

  const stats = calculateStats();

  return (
    <div>
      <div className='navbar-pos'>
          <Navbar user={user} onAuthClick={onAuthClick} onLogout={onLogout} />
      </div>
    
      {notification && (
        <Notification 
          message={notification} 
          onClose={() => setNotification('')} 
        />
      )}
      
      <main className="container" style={{ marginTop: "3rem" }}>
        <div className="card">
          <h2>🌿 Session Feedback & Progress Tracking 🌿</h2>
          <p style={{ color: '#8b4513', fontStyle: 'italic', marginBottom: '1.5rem' }}>
            "Health is not just the absence of disease, but complete physical, mental and social well-being"
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="therapy">Therapy Completed:</label>
              <select id="therapy" style={{padding:10 }} value={formData.therapy} onChange={handleChange} required>
                <option value="">Select therapy</option>
                <option value="Abhyanga">Abhyanga (Oil Massage)</option>
                <option value="Shirodhara">Shirodhara (Oil Pouring)</option>
                <option value="Swedana">Swedana (Steam Therapy)</option>
                <option value="Nasya">Nasya (Nasal Therapy)</option>
                <option value="Basti">Basti (Enema Therapy)</option>
                <option value="Virechana">Virechana (Purgation)</option>
                <option value="Vamana">Vamana (Emesis)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="rating">Overall Experience (1-5):</label>
              <select id="rating" style={{padding:10 }} value={formData.rating} onChange={handleChange} required>
                <option value="">Rate your experience</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="symptoms">Symptoms Relief (1-5):</label>
              <select id="symptoms" style={{padding:10 }} value={formData.symptoms} onChange={handleChange} required>
                <option value="">Rate symptom improvement</option>
                <option value="1">1 - No Relief</option>
                <option value="2">2 - Slight Relief</option>
                <option value="3">3 - Moderate Relief</option>
                <option value="4">4 - Significant Relief</option>
                <option value="5">5 - Complete Relief</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="feedback">Detailed Feedback:</label>
              <textarea 
              style={{padding:10 }}
                id="feedback" 
                rows="3" 
                value={formData.feedback} 
                onChange={handleChange}
                placeholder="How did you feel during and after the therapy? Any side effects or improvements noticed?"
              />
            </div>

            <button type="submit" className="btn">Submit Feedback</button>
          </form>
        </div>

        <div className="card">
          <h3>📈 Progress Overview</h3>
          {stats ? (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="notification">
                  <strong>Total Sessions</strong><br />
                  <span style={{ fontSize: '2rem', color: '#667eea' }}>{stats.totalSessions}</span>
                </div>
                <div className="notification">
                  <strong>Average Rating</strong><br />
                  <span style={{ fontSize: '2rem', color: '#667eea' }}>{stats.avgRating}/5</span>
                </div>
                <div className="notification">
                  <strong>Symptom Relief</strong><br />
                  <span style={{ fontSize: '2rem', color: '#667eea' }}>{stats.avgSymptomRelief}/5</span>
                </div>
                <div className="notification">
                  <strong>Most Used Therapy</strong><br />
                  <span style={{ color: '#667eea' }}>{stats.mostFrequentTherapy}</span>
                </div>
              </div>
              
              <div style={{ marginTop: '1rem' }}>
                <h4>Progress Trend</h4>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.max(0, Math.min(100, (stats.avgSymptomRelief / 5) * 100))}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <p>Complete a session to see your progress statistics.</p>
          )}
        </div>

        <div className="card">
          <h3>📜 Session History</h3>
          <div>
            {progress.length === 0 ? (
              <p>No session data available.</p>
            ) : (
              progress
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(session => (
                  <div key={session.id} className="notification">
                    <strong>{session.therapy}</strong><br />
                    <small>{formatDate(session.date)}</small><br />
                    Experience: {'⭐'.repeat(session.rating)} ({session.rating}/5)<br />
                    Symptom Relief: {'💚'.repeat(session.symptoms)} ({session.symptoms}/5)
                    {session.feedback && <><br /><em>"{session.feedback}"</em></>}
                  </div>
                ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Progress;