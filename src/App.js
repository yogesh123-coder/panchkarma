import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Scheduling from './pages/Scheduling';
import Progress from './pages/Progress';
import Chatbot from './pages/Chatbot';
import Notification from './components/Notification';
import AuthModal from './components/AuthModal';
import { getAppointments } from './utils/storage';
import './styles/App.css';

function App() {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('ayursutra_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Check for reminders every minute
    const interval = setInterval(checkReminders, 60000);
    checkReminders(); // Initial check

    return () => clearInterval(interval);
  }, []);

  const checkReminders = () => {
    if (!user) return;

    const appointments = getAppointments();
    const now = new Date();

    appointments.forEach(appointment => {
      const appointmentTime = new Date(appointment.datetime);
      const timeDiff = appointmentTime - now;

      // Notify 1 hour before appointment
      if (timeDiff > 0 && timeDiff <= 3600000) {
        const notificationId = `reminder-${appointment.id}`;

        // Check if notification already exists
        if (!notifications.find(n => n.id === notificationId)) {
          addNotification(
            notificationId,
            `Upcoming therapy: ${appointment.therapy} in 1 hour`,
            'warning'
          );
        }
      }
    });
  };

  const addNotification = (id, message, type = 'info') => {
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('ayursutra_user', JSON.stringify(userData));
    setShowAuthModal(false);
    addNotification(
      `welcome-${Date.now()}`,
      `Welcome back, ${userData.name}! Your healing journey continues.`,
      'success'
    );
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('ayursutra_user');
    addNotification(
      `logout-${Date.now()}`,
      'You have been logged out successfully. Namaste!',
      'info'
    );
    // Redirect to home page
    window.location.href = '/';
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      setShowAuthModal(true);
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />

        <Routes>
          <Route path="/" element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Home
                user={user}
                onAuthClick={() => setShowAuthModal(true)}
                onLogout={handleLogout}
              />
            )
          } />
          <Route path="/about" element={
            <About
              user={user}
              onAuthClick={() => setShowAuthModal(true)}
              onLogout={handleLogout}
            />
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard
                user={user}
                onAuthClick={() => setShowAuthModal(true)}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          } />
          <Route path="/scheduling" element={
            <ProtectedRoute>
              <Scheduling
                user={user}
                onAuthClick={() => setShowAuthModal(true)}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          } />
          <Route path="/progress" element={
            <ProtectedRoute>
              <Progress
                user={user}
                onAuthClick={() => setShowAuthModal(true)}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          } />
          <Route path="/chatbot" element={
            <ProtectedRoute>
              <Chatbot
                user={user}
                onAuthClick={() => setShowAuthModal(true)}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;