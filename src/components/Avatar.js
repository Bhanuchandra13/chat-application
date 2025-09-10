import React, { useState } from 'react';
import './Avatar.css';

const Avatar = ({ src, alt = "Profile", size = "medium", className = "", showOnlineIndicator = false, isOnline = false }) => {
  const [imageError, setImageError] = useState(false);
  
  const defaultImage = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face';
  
  const handleImageError = () => {
    setImageError(true);
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'avatar-small';
      case 'large':
        return 'avatar-large';
      default:
        return 'avatar-medium';
    }
  };

  return (
    <div className={`avatar-container ${getSizeClass()} ${className}`}>
      <img 
        src={imageError ? defaultImage : src} 
        alt={alt}
        onError={handleImageError}
        className="avatar-image"
      />
      {showOnlineIndicator && isOnline && <div className="online-indicator"></div>}
    </div>
  );
};

export default Avatar;
