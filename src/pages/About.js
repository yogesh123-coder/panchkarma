import React from 'react';
import Navbar from '../components/Navbar';

const About = ({ user, onAuthClick, onLogout }) => {
  const features = [
    {
      icon: '🌿',
      title: 'Traditional Wisdom',
      description: 'Ancient Ayurvedic practices enhanced with modern technology for optimal healing experiences.',
      details: 'Our platform combines 5000-year-old Ayurvedic principles with cutting-edge digital solutions.'
    },
    {
      icon: '📅',
      title: 'Smart Scheduling',
      description: 'Intelligent appointment management system that adapts to your constitution and treatment needs.',
      details: 'AI-powered scheduling considers your dosha, treatment history, and optimal therapy timings.'
    },
    {
      icon: '📈',
      title: 'Progress Tracking',
      description: 'Monitor your healing journey with detailed analytics and personalized insights.',
      details: 'Track symptoms, energy levels, and treatment responses with comprehensive dashboards.'
    },
    {
      icon: '🤖',
      title: 'AI Assistant',
      description: 'Personalized recommendations based on your unique constitution and health profile.',
      details: 'Get instant guidance on diet, lifestyle, and treatment modifications tailored to you.'
    },
    {
      icon: '🏥',
      title: 'Integrated Care',
      description: 'Seamless coordination between practitioners, therapists, and your treatment plan.',
      details: 'Real-time communication and updates ensure everyone is aligned with your healing journey.'
    },
    {
      icon: '📱',
      title: 'Mobile Ready',
      description: 'Access your health information and schedule appointments from anywhere, anytime.',
      details: 'Responsive design ensures optimal experience across all devices and platforms.'
    }
  ];

  return (
    <div className="about-page">
      <Navbar user={user} onAuthClick={onAuthClick} onLogout={onLogout} />
      
      <main className="about-main">
        <section className="about-hero">
          <div className="container">
            <div className="about-hero-content">
              <div className="hero-icon animate-float">🕉️</div>
              <h1 className="playfair">About AyurSutra</h1>
              <p className="hero-subtitle">
                Bridging ancient wisdom with modern technology for holistic healing
              </p>
              <div className="sanskrit-quote">
                <span className="sanskrit">"आयुर्वेदः सर्वदा हितकारी"</span>
                <span className="translation">Ayurveda is always beneficial</span>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <h2 className="section-title playfair">Why Choose AyurSutra?</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <p className="feature-details">{feature.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="philosophy-section">
          <div className="container">
            <div className="philosophy-content">
              <div className="philosophy-text">
                <h2 className="playfair">Our Philosophy</h2>
                <p>
                  AyurSutra is built on the foundation that true healing comes from understanding 
                  the unique constitution of each individual. We believe in the power of Panchakarma 
                  to restore balance and promote natural healing.
                </p>
                <p>
                  Our platform doesn't just manage appointments – it creates a comprehensive 
                  ecosystem where ancient wisdom meets modern convenience, ensuring every aspect 
                  of your healing journey is supported and optimized.
                </p>
                <div className="philosophy-stats">
                  <div className="stat">
                    <span className="stat-number">5000+</span>
                    <span className="stat-label">Years of Wisdom</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Natural Healing</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">AI Support</span>
                  </div>
                </div>
              </div>
              <div className="philosophy-visual">
                <div className="mandala-container">
                  <div className="mandala-circle outer"></div>
                  <div className="mandala-circle middle"></div>
                  <div className="mandala-circle inner"></div>
                  <div className="mandala-center">🕉️</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2 className="playfair">Ready to Begin Your Healing Journey?</h2>
              <p>Join thousands who have transformed their health with AyurSutra</p>
              <div className="cta-buttons">
                {user ? (
                  <a href="/dashboard" className="btn-primary">
                    🚀 Continue Your Journey
                  </a>
                ) : (
                  <button onClick={onAuthClick} className="btn-primary">
                    🚀 Start Your Journey
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;