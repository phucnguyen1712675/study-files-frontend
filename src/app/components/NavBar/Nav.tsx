import styled from 'styled-components/macro';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

import './index.css';
import {
  SIGN_IN_PAGE_PATH,
  SIGN_UP_PAGE_PATH,
} from '../../../constants/routes';

export function Nav() {
  return (
    <Wrapper>
      <Link
        to={SIGN_IN_PAGE_PATH}
        component={Typography.Link}
        className="navBarItem"
      >
        Sign in
      </Link>

      <Link
        to={SIGN_UP_PAGE_PATH}
        component={Typography.Link}
        className="navBarItem"
      >
        Sign up
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;
