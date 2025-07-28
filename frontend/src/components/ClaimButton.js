import React from 'react';

const ClaimButton = ({ onClick, loading, disabled }) => {
  return (
    <button
      className={`btn btn-primary claim-button ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <span className="loading-spinner"></span>}
      {loading ? 'Claiming...' : '🎲 Claim Random Points'}
    </button>
  );
};

export default ClaimButton; 