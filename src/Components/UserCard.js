import React from 'react';

const UserCard = ({ user, onClose }) => {
  return (
    <div className="user-card">
      <div className="user-header">
        <h2>{user.name}</h2>
      </div>
      <div className="user-details">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
