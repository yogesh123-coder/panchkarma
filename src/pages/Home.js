import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = ({ user, onAuthClick, onLogout }) => {
  return (
    <div>
      <div className='navbar-pos'>
        <Navbar user={user} onAuthClick={onAuthClick} onLogout={onLogout} />
      </div>

      <main className="hero">
        <div className="hero-content" style={{marginTop:"4rem"}}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }} className="animate-float">🕉️</div>
          <h2 className="playfair">🌿 Panchakarma Patient Management System 🌿</h2>
          <p>Comprehensive therapy scheduling, progress tracking, and AI-powered assistance for traditional Ayurvedic treatments</p>
          <div className="hero-subtitle">
            "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः"<br />
            <small>May all be happy, may all be healthy</small>
          </div>
          <div className="cta-buttons">
            {user ? (
              <>
                <Link to="/dashboard" className="btn-primary">
                  🚀 Continue Your Journey
                </Link>
                <Link to="/chatbot" className="btn-secondary">
                  🤖 AI Consultation
                </Link>
              </>
            ) : (
              <>
                <button onClick={onAuthClick} className="btn-primary">
                  🚀 Begin Your Journey
                </button>
                <button onClick={onAuthClick} className="btn-secondary">
                  🤖 AI Consultation
                </button>
              </>
            )}
          </div>

          <div className="hero-actions">
            <Link to="/about" className="btn-outline">
              ✨ Learn More About AyurSutra
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;