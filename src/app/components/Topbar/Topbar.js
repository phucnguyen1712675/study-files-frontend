import React, { useState, useContext } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import {
  PersonOutlineSharp,
  ExitToAppSharp,
  ClearSharp,
  SearchSharp,
} from '@material-ui/icons';
import { Grid, InputBase } from '@material-ui/core';
import { message, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './Topbar.css';
import AppContext from '../../AppContext';
import { axiosGuestInstance } from '../../../api/guest';
import { TEACHER_COURSES_PAGE_PATH } from '../../../constants/routes';
import { showLoadingSwal, closeSwal } from '../../../utils/sweet_alert_2';

const { SubMenu } = Menu;

export default function Topbar({ initQuery }) {
  const history = useHistory();
  const { store, dispatch } = useContext(AppContext);
  const [query, setQuery] = useState(initQuery);

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
      showLoadingSwal();

      await axiosGuestInstance.post('/auth/logout', {
        refreshToken: refreshToken,
      });

      closeSwal();
    } catch (err) {
      closeSwal();

      if (err.response) {
        message.error(err.response.data.message);
      } else if (err.request) {
        message.error(err.request);
      } else {
        message.error(err.message);
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

  const handleOnClickMenuItem = ({ keyPath }) => {
    const subCategoryId = keyPath[0];
    const categoryId = keyPath[1];

    const selectedSubCategory = store.subCategories.find(
      subCategory => subCategory.id === subCategoryId,
    );
    const selectedCategory = store.categories.find(
      category => category.id === categoryId,
    );

    if (!selectedSubCategory || !selectedCategory) {
      message.error('Sorry! Category not found.');
    } else {
      const subCategoryName = selectedSubCategory.name;
      const categoryName = selectedCategory.name;

      const subCategoryParam = subCategoryName.replaceAll(' ', '-');
      const categoryParam = categoryName.replaceAll(' ', '-');

      history.push(`/category/${categoryParam}/${subCategoryParam}`, {
        selectedSubCategory: selectedSubCategory,
      });
    }
  };

  const menu = (
    <Menu onClick={handleOnClickMenuItem}>
      {store.categories.map(category => (
        <SubMenu key={category.id} title={category.name}>
          {store.subCategories
            .filter(subCategory => subCategory.categoryId === category.id)
            .map(subCategory => (
              <Menu.Item key={subCategory.id}>{subCategory.name}</Menu.Item>
            ))}
        </SubMenu>
      ))}
    </Menu>
  );

  const CategoriesMenuWidget = function () {
    return (
      <Dropdown overlay={menu}>
        <div
          className="ant-dropdown-link"
          onClick={e => e.preventDefault()}
          href="...clickMe"
          style={{ color: '#525252', marginRight: '15px' }}
        >
          Categories <DownOutlined />
        </div>
      </Dropdown>
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
              <div>Sign in</div>
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
              <div>Sign up</div>
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
