import React from 'react';
import { formatDate } from '../utils/storage';

const RecentActivity = ({ appointments, progress }) => {
  // Combine and sort recent activities
  const getRecentActivities = () => {
    const activities = [];

    // Add recent appointments
    appointments.slice(-3).forEach(apt => {
      activities.push({
        id: `apt-${apt.id}`,
        type: 'appointment',
        title: `${apt.therapy} Session`,
        description: `Scheduled with ${apt.therapist}`,
        date: apt.datetime,
        icon: '📅',
        color: '#daa520'
      });
    });

    // Add recent progress entries
    progress.slice(-3).forEach(session => {
      activities.push({
        id: `progress-${session.id}`,
        type: 'progress',
        title: `${session.therapy} Completed`,
        description: `Rated ${session.rating}/5 stars`,
        date: session.date,
        icon: '✅',
        color: '#228b22'
      });
    });

    // Sort by date (most recent first)
    return activities
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  };

  const activities = getRecentActivities();

  return (
    <div className="recent-activity">
      <h3 className="playfair">📋 Recent Activity</h3>
      <div className="activity-list">
        {activities.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
            <p>Your healing journey starts here!</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
              Schedule your first therapy session to begin tracking your progress.
            </p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className="activity-item animate-slideInLeft"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className="activity-icon"
                style={{ backgroundColor: activity.color }}
              >
                {activity.icon}
              </div>
              <div className="activity-content">
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
                <small>{formatDate(activity.date)}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;