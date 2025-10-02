import React from 'react';

const DashboardStats = ({ appointments, progress }) => {
  const calculateStats = () => {
    const totalAppointments = appointments.length;
    const upcomingAppointments = appointments.filter(
      apt => new Date(apt.datetime) > new Date()
    ).length;
    
    const totalSessions = progress.length;
    const avgRating = totalSessions > 0 
      ? (progress.reduce((sum, session) => sum + session.rating, 0) / totalSessions).toFixed(1)
      : 0;

    return {
      totalAppointments,
      upcomingAppointments,
      totalSessions,
      avgRating
    };
  };

  const stats = calculateStats();

  const statCards = [
    {
      title: 'Total Appointments',
      value: stats.totalAppointments,
      icon: '📅',
      color: '#daa520',
      bgColor: 'linear-gradient(135deg, #daa520, #b8860b)'
    },
    {
      title: 'Upcoming Sessions',
      value: stats.upcomingAppointments,
      icon: '⏰',
      color: '#228b22',
      bgColor: 'linear-gradient(135deg, #228b22, #32cd32)'
    },
    {
      title: 'Completed Sessions',
      value: stats.totalSessions,
      icon: '✅',
      color: '#ff8c00',
      bgColor: 'linear-gradient(135deg, #ff8c00, #ffa500)'
    },
    {
      title: 'Average Rating',
      value: `${stats.avgRating}/5`,
      icon: '⭐',
      color: '#dc143c',
      bgColor: 'linear-gradient(135deg, #dc143c, #ff6b6b)'
    }
  ];

  return (
    <div className="dashboard-stats">
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div 
            key={index} 
            className="stat-card animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="stat-icon" style={{ background: stat.bgColor }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;