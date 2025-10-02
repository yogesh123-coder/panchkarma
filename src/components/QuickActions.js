import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  const actions = [
    {
      title: 'Schedule New Therapy',
      description: 'Book your next Panchakarma session',
      icon: '📅',
      link: '/scheduling',
      color: 'linear-gradient(135deg, #228b22, #32cd32)'
    },
    {
      title: 'View Progress',
      description: 'Track your healing journey',
      icon: '📈',
      link: '/progress',
      color: 'linear-gradient(135deg, #daa520, #b8860b)'
    },
    {
      title: 'AI Consultation',
      description: 'Get personalized recommendations',
      icon: '🤖',
      link: '/chatbot',
      color: 'linear-gradient(135deg, #ff8c00, #ffa500)'
    }
  ];

  return (
    <div className="quick-actions">
      <h3 className="playfair">⚡ Quick Actions</h3>
      <div className="actions-grid">
        {actions.map((action, index) => (
          <Link 
            key={index}
            to={action.link} 
            className="action-card animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="action-icon" style={{ background: action.color }}>
              {action.icon}
            </div>
            <div className="action-content">
              <h4>{action.title}</h4>
              <p>{action.description}</p>
            </div>
            <div className="action-arrow">→</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;