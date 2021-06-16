import React from 'react';
import './Topbar.css';
import { AccountCircleOutlined, ExitToAppOutlined } from '@material-ui/icons';

export default function topbarUserPage() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">STUDY-FILES</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <AccountCircleOutlined />
          </div>
          <span className="text">user name here</span>

          <div className="topbarIconContainer">
            <ExitToAppOutlined />
          </div>
          <span className="text">Logout</span>
        </div>
      </div>
    </div>
  );
}
