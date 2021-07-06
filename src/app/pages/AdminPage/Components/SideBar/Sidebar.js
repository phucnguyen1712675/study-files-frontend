import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
// import { IconContext } from 'react-icons/lib';

import { Menu, Close } from '@material-ui/icons';

const Nav = styled.div`
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  position: absolute;
  // background: #76a5ff;
  color: #76a5ff;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavIconClose = styled(Link)`
  background: #76a5ff;
  color: white;
  margin-left: 1rem;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #76a5ff;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = function () {
    setSidebar(!sidebar);
  };
  if (localStorage.studyFiles_user_role === 'admin') {
    return (
      <>
        <NavIcon to="#">
          <Menu onClick={showSidebar} />
        </NavIcon>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <Nav />
            <NavIconClose to="#">
              <Close onClick={showSidebar} />
            </NavIconClose>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </>
    );
  } else {
    return <></>;
  }
};

export default Sidebar;
