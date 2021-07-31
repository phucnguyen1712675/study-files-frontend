import React, { useState, useContext } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import {
  PersonOutlineSharp,
  ExitToAppSharp,
  KeyboardArrowDownSharp,
  ClearSharp,
  SearchSharp,
} from '@material-ui/icons';
import { Grid, InputBase, MenuItem, Menu } from '@material-ui/core';
import NestedMenuItem from 'material-ui-nested-menu-item';
import './Topbar.css';
import AppContext from '../../AppContext';
import { axiosGuestInstance } from 'api/guest';
import { TEACHER_COURSES_PAGE_PATH } from '../../../constants/routes';

export default function Topbar({ initQuery }) {
  const history = useHistory();
  const { store, dispatch } = useContext(AppContext);
  const [query, setQuery] = useState(initQuery);

  const [menuPosition, setMenuPosition] = useState(null);

  const btnSignOut_Clicked = async function () {
    delete localStorage.studyFiles_user_accessToken;
    delete localStorage.studyFiles_user_accessToken_expires;
    delete localStorage.studyFiles_user_id;
    delete localStorage.studyFiles_user_role;
    delete localStorage.studyFiles_user_name;
    delete localStorage.studyFiles_user_email;
    delete localStorage.studyFiles_user_isVerified;
    const refreshToken = localStorage.studyFiles_user_refreshToken;
    try {
      await axiosGuestInstance.post('/auth/logout', {
        refreshToken: refreshToken,
      });
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else if (err.request) {
        alert(err.request);
      } else {
        alert(err.message);
      }
    }

    delete localStorage.studyFiles_user_refreshToken;
    dispatch({
      type: 'update_user_id',
      payload: {
        userId: '',
      },
    });
    dispatch({
      type: 'clear_store',
    });
    history.push('/login');
  };

  const PathName = path => {
    const location = useLocation();
    return location.pathname === path;
  };

  const PathNameContain = path => {
    const location = useLocation();
    return location.pathname.includes(path);
  };

  const NavigateToSearchScreen = function () {
    history.push(`/search?query=${query}`, { query: query });
  };

  const NavigateToUserPage = function () {
    if (localStorage.studyFiles_user_role === 'student') {
      history.push('/student');
    } else if (localStorage.studyFiles_user_role === 'teacher') {
      history.push(TEACHER_COURSES_PAGE_PATH);
    } else if (localStorage.studyFiles_user_role === 'admin') {
      history.push('/admin/users');
    }
  };

  const OnKeyClickSearchBar = function (e) {
    if (e.keyCode === 13) {
      NavigateToSearchScreen();
    }
  };

  const ClearQuery = function () {
    if (query.trim() !== '') {
      return (
        <ClearSharp
          onClick={() => {
            // setQuery('');
            dispatch({
              type: 'update_query',
              payload: {
                query: '',
              },
            });
            history.push('/');
          }}
          className="userText"
          style={{ marginRight: '20px' }}
        />
      );
    }
    return <></>;
  };

  const handleListCategoriesClick = event => {
    if (menuPosition) {
      return;
    }
    event.preventDefault();
    setMenuPosition({
      top: 50,
      left: event.pageX,
    });
  };

  const handleCategoryClick = function (event, categoryName, subCategory) {
    if (subCategory) {
      const temp = categoryName.replaceAll(' ', '-');
      const temp2 = subCategory.name.replaceAll(' ', '-');
      history.push(`/category/${temp}/${temp2}`, {
        selectedSubCategory: subCategory,
      });
    }
    setMenuPosition(null);
  };

  const CategoryMenuItemWidget = function (category) {
    return (
      <div
        class="request-top"
        style={{
          whiteSpace: 'pre-wrap',
          overflowWrap: 'break-word',
          width: '250px',
          padding: '5px 0px',
        }}
      >
        <span style={{ color: '#525252' }}>{category.name}</span>
      </div>
    );
  };

  const CategoriesMenuWidget = function () {
    return (
      <div>
        <div
          className="userText"
          onClick={handleListCategoriesClick}
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
        <Menu
          open={!!menuPosition}
          onClose={() => setMenuPosition(null)}
          anchorReference="anchorPosition"
          anchorPosition={menuPosition}
        >
          {store.categories.map(category => (
            <NestedMenuItem
              key={category.id}
              label={CategoryMenuItemWidget(category)}
              parentMenuOpen={!!menuPosition}
            >
              {store.subCategories
                .filter(subCategory => subCategory.categoryId === category.id)
                .map(subCategory => (
                  <MenuItem
                    key={subCategory.id}
                    onClick={e =>
                      handleCategoryClick(e, category.name, subCategory)
                    }
                    value={subCategory.id}
                  >
                    {CategoryMenuItemWidget(subCategory)}
                  </MenuItem>
                ))}
            </NestedMenuItem>
          ))}
        </Menu>
      </div>
    );
  };

  const SearchAndCategories = function () {
    if (!PathNameContain('admin'))
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
          {CategoriesMenuWidget()}
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
            onKeyUp={e => OnKeyClickSearchBar(e)}
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
    else return <></>;
  };

  const TopBarRight = function () {
    if (
      localStorage.studyFiles_user_role === 'student' ||
      localStorage.studyFiles_user_role === 'teacher' ||
      localStorage.studyFiles_user_role === 'admin'
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

  if (!PathName('/login') && !PathName('/register')) {
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
