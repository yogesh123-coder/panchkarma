import React, { useEffect } from 'react';

const Notification = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return '✓';
      case 'warning': return '⚠️';
      case 'error': return '✗';
      default: return '🌿';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'success': return 'Success';
      case 'warning': return 'Reminder';
      case 'error': return 'Error';
      default: return 'Info';
    }
  };

  return (
    <div 
      className={`notification ${type}`} 
      style={{ 
        position: 'fixed', 
        top: '20px', 
        right: '20px', 
        zIndex: 1000,
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.2rem' }}>{getIcon()}</span>
        <div style={{ flex: 1 }}>
          <strong>{getTitle()}:</strong>
          <div style={{ marginTop: '0.25rem' }}>{message}</div>
        </div>
        <button 
          onClick={onClose} 
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '1.2rem', 
            cursor: 'pointer',
            color: 'inherit',
            opacity: 0.7,
            transition: 'opacity 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.7'}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;