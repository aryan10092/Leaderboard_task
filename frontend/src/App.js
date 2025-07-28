import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import UserSelector from './components/UserSelector';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import AddUser from './components/AddUser';
import ClaimHistory from './components/ClaimHistory';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const newSocket = io(API_BASE_URL);
    setSocket(newSocket);

    newSocket.on('rankingsUpdated', (updatedUsers) => {
      setUsers(updatedUsers);
    });

    newSocket.on('pointsClaimed', (data) => {
      setMessage(`🎉 ${data.userName} claimed ${data.pointsAwarded} points! Total: ${data.newTotalPoints}`);
      setTimeout(() => setMessage(''), 5000);
    });

    fetchUsers();

    return () => {
      newSocket.close();
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage('Error fetching users. Please try again.');
    }
  };

  const handleClaimPoints = async () => {
    if (!selectedUser) {
      setMessage('Please select a user first!');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/claims`, {
        userId: selectedUser
      });

      if (response.data.success) {
        setSelectedUser('');
      }
    } catch (error) {
      console.error('Error claiming points:', error);
      setMessage('Error claiming points. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAdded = () => {
    setMessage('User added successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏆 Leaderboard System</h1>
        <p>Select a user and claim random points (1-10) to see the rankings update in real-time!</p>
      </header>
      
      <main className="App-main">
        {message && (
          <div className="message-banner">
            {message}
          </div>
        )}
        
        <div className="controls-section">
          <div className="user-controls">
         {/* <div><label htmlFor="userSelect" style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px'}}>Select a User:</label>
       */}
            <UserSelector 
              users={users}
              selectedUser={selectedUser}
              onUserSelect={setSelectedUser}
              style={{marginTop: '10px'}}
            />
            <ClaimButton 
              onClick={handleClaimPoints}
              loading={loading}
              disabled={!selectedUser}
              className="claim-button"
            />
          </div>
          
          <div className="add-user-section">
            <AddUser onUserAdded={handleUserAdded} />
          </div>
        </div>

        <div className="content-sections">
          <div className="leaderboard-section">
            <Leaderboard users={users} />
          </div>
          
          <div className="history-section">
            <button 
              className="toggle-history-btn"
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? 'Hide' : 'Show'} Claim History
            </button>
            {showHistory && <ClaimHistory />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
