import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, onAuthClick, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowUserDropdown(false);
  }, [location]);

  const handleLogout = () => {
    onLogout();
    setIsMobileMenuOpen(false);
    setShowUserDropdown(false);
  };

  const navItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/scheduling', icon: '📅', label: 'Schedule' },
    { path: '/progress', icon: '📈', label: 'Progress' },
    { path: '/chatbot', icon: '🤖', label: 'AI Assistant' }
  ];

  return (
    <header>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Brand */}
          <div className="nav-brand">
            <span className="nav-logo animate-float">🕉️</span>
            <Link to="/" className="brand-link">
              <h1 className="playfair">AyurSutra</h1>
              <span className="brand-tagline">Healing Journey</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className={`nav-center ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {user && (
              <ul className="nav-links">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={location.pathname === item.path ? 'active' : ''}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span className="nav-label">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Auth Section */}
            <div className="nav-auth">
              {user ? (
                <div className="user-section">
                  <div
                    className="user-profile"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                  >
                    <div className="user-avatar animate-pulse">{user.avatar}</div>
                    <span className="user-info">
                      <span className="user-name">{user.name}</span>
                      {/* <span className="user-role">{user.role}</span> */}
                    </span>
                    <span className="dropdown-arrow">▼</span>
                  </div>

                  {showUserDropdown && (
                    <div className="user-dropdown animate-fadeInUp">
                      <div className="dropdown-header">
                        <div className="user-avatar-large">{user.avatar}</div>
                        <div>
                          <div className="dropdown-name">{user.name}</div>
                          <div className="dropdown-email">{user.email}</div>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item">
                        📝 Profile Settings
                      </button>
                      <button className="dropdown-item">
                        🔔 Notifications
                      </button>
                      <button className="dropdown-item">
                        ⚙️ Preferences
                      </button>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item logout" onClick={handleLogout}>
                        🚪 Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="auth-btn"
                >
                  <span>🔐</span>
                  <span>Login / Sign Up</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;