import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ users }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return '👑';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return rank;
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

  const topThree = users.slice(0, 3);
  const remaining = users.slice(3);

  const formatPoints = (points) => {
    return points.toLocaleString();
  };

  return (
    <div className="leaderboard">
      <h2>🏆 Live Rankings</h2>
      
      {users.length === 0 ? (
        <div className="no-users">
          <p>No users found. Add some users to get started!</p>
        </div>
      ) : (
        <>
          {topThree.length > 0 && (
            <div className="podium-section">
              {topThree.map((user) => (
                <div
                  key={user._id}
                  className={`podium-item podium-${
                    user.rank === 1 ? 'first' : 
                    user.rank === 2 ? 'second' : 'third'
                  }`}
                >
                  <div className="podium-avatar" style={{ background: getAvatarColor(user.name) }}>
                    {user.rank === 1 && <div className="podium-crown">👑</div>}
                    {getUserInitials(user.name)}
                  </div>
                  <div className="podium-name">{user.name}</div>
                  <div className="podium-points">{formatPoints(user.totalPoints)} pts</div>
                </div>
              ))}
            </div>
          )}

          {remaining.length > 0 && (
            <div className="leaderboard-list">
              {remaining.map((user) => (
                <div
                  key={user._id}
                  className={`leaderboard-item ${user.rank <= 10 ? 'top-performer' : ''}`}
                >
                  <div className="rank-badge">
                    {getRankIcon(user.rank)}
                  </div>
                  
                  <div 
                    className="user-avatar" 
                    style={{ background: getAvatarColor(user.name) }}
                  >
                    {getUserInitials(user.name)}
                  </div>
                  
                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-points">{formatPoints(user.totalPoints)} points</div>
                  </div>
                  
                  <div className="points-badge">
                    {formatPoints(user.totalPoints)}
                  </div>
                  
                  {user.rank <= 10 && (
                    <div className="rank-medal">✨</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {topThree.length < 3 && users.length > 0 && (
            <div className="leaderboard-list">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="leaderboard-item"
                >
                  <div className="rank-badge">
                    {getRankIcon(user.rank)}
                  </div>
                  
                  <div 
                    className="user-avatar" 
                    style={{ background: getAvatarColor(user.name) }}
                  >
                    {getUserInitials(user.name)}
                  </div>
                  
                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-points">{formatPoints(user.totalPoints)} points</div>
                  </div>
                  
                  <div className="points-badge">
                    {formatPoints(user.totalPoints)}
                  </div>
                  
                  {user.rank <= 3 && (
                    <div className="rank-medal">
                      {user.rank === 1 ? '👑' : user.rank === 2 ? '🥈' : '🥉'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard; 