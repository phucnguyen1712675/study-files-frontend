// import React from 'react';
import './Topbar.css';
import { AccountCircleOutlined, ExitToAppOutlined } from '@material-ui/icons';
import { useHistory, useLocation, Link } from 'react-router-dom';

export default function Topbar(this: any) {
  const history = useHistory();

  const btnSignOut_Clicked = function () {
    delete localStorage.studyFiles_user_accessToken;
    delete localStorage.studyFiles_user_id;
    delete localStorage.studyFiles_user_role;
    history.push('/login');
  };

  const PathName = path => {
    const location = useLocation();
    console.log(location.pathname);
    return location.pathname === path;
  };

  if (localStorage.studyFiles_user_role === 'admin') {
    return (
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <Link to="/" className="text" style={{ textDecoration: 'none' }}>
              <span className="logo">STUDY-FILES</span>
            </Link>
          </div>
          <div className="topRight">
            <Link
              to="/admin"
              className="text"
              style={{ textDecoration: 'none' }}
            >
              <div className="topbarIconContainer">
                <AccountCircleOutlined />
              </div>
              <span className="text">Admin</span>
            </Link>

            <div
              className="text"
              onClick={btnSignOut_Clicked}
              style={{ textDecoration: 'none' }}
            >
              <div className="topbarIconContainer">
                <ExitToAppOutlined />
              </div>
              <span className="text">Logout</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (
    localStorage.studyFiles_user_role === 'student' ||
    localStorage.studyFiles_user_role === 'teacher'
  ) {
    return (
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <Link to="/" className="text" style={{ textDecoration: 'none' }}>
              <span className="logo">STUDY-FILES</span>
            </Link>
          </div>
          <div className="topRight">
            <Link to="/" className="text" style={{ textDecoration: 'none' }}>
              <div className="topbarIconContainer">
                <AccountCircleOutlined />
              </div>
              <span className="text">user name here</span>
            </Link>
            <div
              className="text"
              onClick={btnSignOut_Clicked}
              style={{ textDecoration: 'none' }}
            >
              <div className="topbarIconContainer">
                <ExitToAppOutlined />
              </div>
              <span className="text">Logout</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (!PathName('/login') && !PathName('/register')) {
    return (
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <Link to="/" className="text" style={{ textDecoration: 'none' }}>
              <span className="logo">STUDY-FILES</span>
            </Link>
          </div>
          <div className="topRight">
            <Link
              to="/login"
              className="text"
              style={{ textDecoration: 'none' }}
            >
              Login
            </Link>
            <span className="text">|</span>
            <Link
              to="/register"
              className="text"
              style={{ textDecoration: 'none' }}
            >
              Register
            </Link>
            <span className="text">|</span>
            <Link
              to="/login"
              className="text"
              style={{ textDecoration: 'none' }}
            >
              Admin site
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
