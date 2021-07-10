import React, { useState, useContext } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';

import {
  PersonOutlineSharp,
  ExitToAppSharp,
  KeyboardArrowDownSharp,
  ClearSharp,
  SearchSharp,
} from '@material-ui/icons';
import { Grid, InputBase } from '@material-ui/core';
import './Topbar.css';
import AppContext from '../../AppContext';

export default function Topbar({ initQuery }) {
  const history = useHistory();
  const { dispatch } = useContext(AppContext);
  const [query, setQuery] = useState(initQuery);

  const btnSignOut_Clicked = function () {
    delete localStorage.studyFiles_user_accessToken;
    delete localStorage.studyFiles_user_id;
    delete localStorage.studyFiles_user_role;
    history.push('/login');
  };

  const PathName = path => {
    const location = useLocation();
    return location.pathname === path;
  };

  const NavigateToSearchScreen = function () {
    dispatch({
      type: 'update_query',
      payload: {
        query: query,
      },
    });
  };

  // TODO navigate to student/teacher/page
  const NavigateToUserPage = function () {
    if (localStorage.studyFiles_user_role === 'student') {
      // TODO Vu navigate to student Page
    } else if (localStorage.studyFiles_user_role === 'teacher') {
      // TODO Phuc navigate to teacher page
    }
  };

  const OnKeyClick = function (e) {
    if (e.keyCode === 13) {
      NavigateToSearchScreen();
    }
  };

  const ClearQuery = function () {
    if (query.trim() !== '') {
      return (
        <ClearSharp
          onClick={() => {
            dispatch({
              type: 'update_query',
              payload: {
                query: initQuery,
              },
            });
          }}
          className="userText"
          style={{ marginRight: '20px' }}
        />
      );
    }
    return <></>;
  };

  const SearchAndCategories = function () {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#EBEBEB',
          paddingLeft: '20px',
          paddingTop: '5px',
          paddingBottom: '5px',
          borderRadius: '5px',
          marginLeft: '15px',
          marginRight: '50px',
        }}
      >
        <div
          className="userText"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '30px',
          }}
        >
          <div style={{ marginRight: '30px' }}>Categories</div>
          <span>
            <KeyboardArrowDownSharp />
          </span>
        </div>
        <div
          className="userText"
          style={{ marginRight: '20px', fontSize: '20', color: '#CBCBCB' }}
        >
          {' '}
          |{' '}
        </div>
        <InputBase
          style={{ flexGrow: 1, marginRight: '30px' }}
          placeholder="Search here ..."
          value={query}
          onKeyUp={e => OnKeyClick(e)}
          onChange={e => setQuery(e.target.value)}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '30px',
          }}
        >
          {ClearQuery()}
          <div
            className="userText"
            style={{ marginRight: '20px', fontSize: '20', color: '#CBCBCB' }}
          >
            {' '}
            |{' '}
          </div>
          <SearchSharp
            onClick={() => NavigateToSearchScreen()}
            className="userText"
            style={{ marginRight: '0px' }}
          />
        </div>
      </div>
    );
  };

  const TopBarRight = function () {
    if (
      localStorage.studyFiles_user_role === 'student' ||
      localStorage.studyFiles_user_role === 'teacher'
    ) {
      return (
        <Grid container direction="row" alignItems="center">
          <Grid>
            <div
              onClick={() => NavigateToUserPage()}
              className="userText"
              style={{ textDecoration: 'none' }}
            >
              <div className="userTopbarIconContainer">
                <PersonOutlineSharp />
              </div>
              <div>{localStorage.studyFiles_user_name}</div>
            </div>
          </Grid>
          <Grid>
            <span className="userText" style={{ color: '#CBCBCB' }}>
              |
            </span>
          </Grid>
          <Grid>
            <div
              className="userText"
              onClick={btnSignOut_Clicked}
              style={{ textDecoration: 'none' }}
            >
              <div className="userTopbarIconContainer">
                <ExitToAppSharp />
              </div>
              <div>Logout</div>
            </div>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container direction="row" alignItems="center">
          <Grid>
            <Link
              to="/login"
              className="userText"
              style={{ textDecoration: 'none' }}
            >
              <div>sign in</div>
            </Link>
          </Grid>
          <Grid>
            <span className="userText" style={{ color: '#CBCBCB' }}>
              |
            </span>
          </Grid>
          <Grid>
            <Link
              to="/register"
              className="userText"
              style={{ textDecoration: 'none' }}
            >
              <div>sign up</div>
            </Link>
          </Grid>
          <Grid>
            <span className="userText" style={{ color: '#CBCBCB' }}>
              |
            </span>
          </Grid>
          <Grid>
            <Link
              to="/admin/users"
              className="userText"
              style={{ textDecoration: 'none' }}
            >
              <div>Admin site</div>
            </Link>
          </Grid>
        </Grid>
      );
    }
  };

  const TopBar = function () {
    return (
      <div className="userTopBar">
        <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
          <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span className="userLogo">STUDY-FILES</span>
            </Link>
          </div>
          <div style={{ flexGrow: 1 }}>{SearchAndCategories()}</div>
          <div>{TopBarRight()}</div>
        </div>
      </div>
    );
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
              to="/admin/users"
              className="text"
              style={{ textDecoration: 'none' }}
            >
              <div className="topbarIconContainer">
                <PersonOutlineSharp />
              </div>
              <span className="text">Admin</span>
            </Link>

            <div
              className="text"
              onClick={btnSignOut_Clicked}
              style={{ textDecoration: 'none' }}
            >
              <div className="topbarIconContainer">
                <ExitToAppSharp />
              </div>
              <span className="text">Logout</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (!PathName('/login') && !PathName('/register')) {
    return TopBar();
  } else {
    return (
      <div className="userTopBar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <Link to="/" className="text" style={{ textDecoration: 'none' }}>
              <span className="userLogo">STUDY-FILES</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
