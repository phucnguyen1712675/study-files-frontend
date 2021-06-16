import React from 'react';
import './Topbar.css';

export default function TopbarGuestPage() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">STUDY-FILES</span>
        </div>
        <div className="topRight">
          <span className="text">Login</span>
          <span className="text">|</span>
          <span className="text">Register</span>
          <span className="text">|</span>
          <span className="text">ADMIN SITE</span>
        </div>
      </div>
    </div>
  );
}
