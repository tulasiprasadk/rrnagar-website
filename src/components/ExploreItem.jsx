import React, { useState } from 'react';
import './ExploreItem.css'; // Optional: Only if you want to move styles here

export default function ExploreItem({ icon, title, desc, longInfo }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className="explore-card"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <div className="explore-icon-wrap">
        <span className="explore-icon">{icon}</span>
      </div>
      <div>
        <h3 style={{ fontSize: '18px', margin: '8px 0' }}>{title}</h3>
        <p style={{ fontSize: '14px', color: '#555' }}>{desc}</p>
      </div>

      <div className={`explore-popup ${showPopup ? 'visible' : ''}`}>
        <div className="popup-title">{title}</div>
        <div className="popup-body">{longInfo}</div>
      </div>
    </div>
  );
}
