import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AddUser = ({ onUserAdded }) => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      setError('Please enter a user name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/users`, {
        name: userName.trim()
      });

      if (response.status === 201) {
        setUserName('');
        onUserAdded();
      }
    } catch (error) {
      console.error('Error adding user:', error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError('Failed to add user. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user">
      <h3>➕ Add New User</h3>
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter user name..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={loading}
            
          />
        </div>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-success"
          disabled={loading || !userName.trim()}
        >
          {loading && <span className="loading-spinner"></span>}
          {loading ? 'Adding...' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default AddUser; 