import React from 'react';
import './TopicCard.css';

const TopicCard = ({ title, description, isActive, status }) => {
  return (
    <div className={`topic-card glass-panel ${isActive ? 'active' : ''}`}>
      <div className="topic-card-header">
        <h3>{title}</h3>
        {status && <span className="status-badge">{status}</span>}
      </div>
      <p className="topic-card-desc">{description}</p>
      {isActive && (
        <div className="topic-card-action">
          <span className="action-text">ACCEDER</span>
        </div>
      )}
    </div>
  );
};

export default TopicCard;
