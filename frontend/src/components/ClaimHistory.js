import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClaimHistory.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ClaimHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/claims/history?limit=20`);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
      setError('Failed to load claim history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name) => {
    const colors = [
      'linear-gradient(135deg, #667eea, #764ba2)',
      'linear-gradient(135deg, #f093fb, #f5576c)',
      'linear-gradient(135deg, #4facfe, #00f2fe)',
      'linear-gradient(135deg, #43e97b, #38f9d7)',
      'linear-gradient(135deg, #fa709a, #fee140)',
      'linear-gradient(135deg, #a8edea, #fed6e3)',
      'linear-gradient(135deg, #ff9a9e, #fecfef)',
      'linear-gradient(135deg, #ffecd2, #fcb69f)',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <div className="claim-history">
        <h3>📊 Recent Claims</h3>
        <div className="loading-container">
          <span className="loading-spinner"></span>
          Loading claims...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="claim-history">
        <h3>📊 Recent Claims</h3>
        <div className="error-message">
          {error}
        </div>
        <button
          className="refresh-btn"
          onClick={fetchHistory}
        >
          🔄 Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="claim-history">
      <h3>📊 Recent Claims</h3>
      {history.length === 0 ? (
        <div className="no-history">
          <p>No claims yet. Start claiming points!</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((claim, index) => (
            <div key={claim._id} className="history-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="claim-info">
                <div 
                  className="claim-avatar" 
                  style={{ background: getAvatarColor(claim.userName) }}
                >
                  {getUserInitials(claim.userName)}
                </div>
                <div className="claim-details">
                  <div className="claim-user">{claim.userName}</div>
                  <div className="claim-points">+{claim.pointsAwarded} points</div>
                </div>
              </div>
              <div className="claim-date">
                {formatDate(claim.claimDate)}
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        className="refresh-btn"
        onClick={fetchHistory}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="loading-spinner"></span>
            Refreshing...
          </>
        ) : (
          '🔄 Refresh History'
        )}
      </button>
    </div>
  );
};

export default ClaimHistory; 