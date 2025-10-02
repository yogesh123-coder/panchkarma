import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DashboardStats from '../components/DashboardStats';
import QuickActions from '../components/QuickActions';
import RecentActivity from '../components/RecentActivity';
import { getAppointments, getProgress, formatDate } from '../utils/storage';

const Dashboard = ({ user, onAuthClick, onLogout }) => {
  const [appointments, setAppointments] = useState([]);
  const [progress, setProgress] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const appointmentData = getAppointments();
    const progressData = getProgress();
    
    setAppointments(appointmentData);
    setProgress(progressData);
    
    // Filter upcoming appointments
    const now = new Date();
    const upcoming = appointmentData
      .filter(apt => new Date(apt.datetime) > now)
      .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
      .slice(0, 3);
    
    setUpcomingAppointments(upcoming);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="dashboard-container">
      <div className='navbar-pos'>
         <Navbar user={user} onAuthClick={onAuthClick} onLogout={onLogout} />
      </div>
     
      
      <main className="dashboard-main">
        
        {/* Welcome Header */}
        <div className="dashboard-header animate-fadeInUp">
           <div className="header-decoration">
            <div className="floating-icon animate-float" style={{marginTop:"1.5rem"}}>🕉️</div>
          </div>
          <div className="welcome-section">
            <h1 className="playfair">
              {getGreeting()}, {user?.name}! 🙏
            </h1>
            <p className="welcome-subtitle">
              Welcome to your Ayurvedic healing dashboard. Track your progress and manage your wellness journey.
            </p>
          </div>
          {/* <div className="header-decoration">
            <div className="floating-icon animate-float">🕉️</div>
          </div> */}
        </div>

        {/* Dashboard Stats */}
        <DashboardStats appointments={appointments} progress={progress} />

        {/* Main Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="dashboard-left">
            {/* Upcoming Appointments */}
            <div className="card animate-fadeInUp">
              <h3 className="playfair">📅 Upcoming Appointments</h3>
              <div className="appointments-list">
                {upcomingAppointments.length === 0 ? (
                  <div className="empty-state">
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📅</div>
                    <p>No upcoming appointments</p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Schedule your next therapy session</p>
                  </div>
                ) : (
                  upcomingAppointments.map((apt, index) => (
                    <div 
                      key={apt.id} 
                      className="appointment-card animate-slideInLeft"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="appointment-icon">🌿</div>
                      <div className="appointment-details">
                        <h4>{apt.therapy}</h4>
                        <p>{formatDate(apt.datetime)}</p>
                        <small>Dr. {apt.therapist}</small>
                      </div>
                      <div className="appointment-status">
                        <span className="status-badge confirmed">Confirmed</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <QuickActions />
            </div>
          </div>

          {/* Right Column */}
          <div className="dashboard-right">
            {/* Recent Activity */}
            <div className="card animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <RecentActivity appointments={appointments} progress={progress} />
            </div>

            {/* Wellness Tip */}
            <div className="card wellness-tip animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <h3 className="playfair">🌱 Daily Wellness Tip</h3>
              <div className="tip-content">
                <div className="tip-icon">🧘‍♀️</div>
                <div>
                  <h4>Practice Pranayama</h4>
                  <p>Start your day with 10 minutes of deep breathing exercises to balance your doshas and enhance mental clarity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;