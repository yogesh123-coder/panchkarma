import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [selectedRole, setSelectedRole] = useState('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        role: selectedRole,
        avatar: formData.name ? formData.name.charAt(0).toUpperCase() : 'U'
      };

      onLogin(userData);
      setLoading(false);
      onClose();
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🕉️</div>
          <h2 className="playfair" style={{ color: '#2d4a22', fontSize: '1.8rem' }}>
            Welcome to AyurSutra
          </h2>
        </div>

        <div className="auth-tabs">
          <button
          style={{ padding: 13 }}
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
          style={{ padding: 13 }}
            className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="role-selector">
            <button
              type="button"
              style={{ padding: 13 }}
              className={`role-option ${selectedRole === 'patient' ? 'selected' : ''}`}
              onClick={() => setSelectedRole('patient')}
            >
              🧘‍♀️ Patient
            </button>
            <button
            style={{ padding: 13 }}
              type="button"
              className={`role-option ${selectedRole === 'therapist' ? 'selected' : ''}`}
              onClick={() => setSelectedRole('therapist')}
            >
              👨‍⚕️ Therapist
            </button>
          </div>

          {activeTab === 'signup' && (
            <div className="form-group">
              <label>Full Name</label>
              <input
              style={{ padding: 10 }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div className="form-group" >
            <label>Email Address</label>
            <input
              style={{ padding: 10 }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {activeTab === 'signup' && (
            <div className="form-group">
              <label>Phone Number</label>
              <input
              style={{ padding: 10 }}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
          )}

          <div className="form-group password-field">
            <label>Password</label>
            <input
            style={{ padding: 10 }}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <button
            style={{ padding: 10 }}
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          {activeTab === 'signup' && (
            <div className="form-group password-field">
              <label>Confirm Password</label>
              <input
              style={{ padding: 10 }}
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                {activeTab === 'login' ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              activeTab === 'login' ? '🚀 Sign In' : '✨ Create Account'
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#8b4513' }}>
          {activeTab === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('signup')}
                style={{ background: 'none', border: 'none', color: '#daa520', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Sign up here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                style={{ background: 'none', border: 'none', color: '#daa520', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Sign in here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;