import React from 'react';

const UserSelector = ({ users, selectedUser, onUserSelect }) => {
  return (
    <div className="user-selector">
      <div className="form-group" style={{paddingTop: '15px'}} >
        {/* <label
          htmlFor="userSelect"
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            paddingLeft: '6px'
          }}
        >
          Select a User:
        </label> */}
        <select 
          // id="userSelect"
          className="form-control"
          value={selectedUser}
          onChange={(e) => onUserSelect(e.target.value)}
          style={{height: '60px'}}
        >
          <option value="" >Choose a user...</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.totalPoints} points)
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UserSelector; 