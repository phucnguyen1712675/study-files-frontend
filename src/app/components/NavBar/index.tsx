import styled from 'styled-components/macro';
import { Logo } from './Logo';
import { StyleConstants } from 'styles/StyleConstants';
import { Nav } from './Nav';
import { PageWrapper } from '../PageWrapper';

export function NavBar() {
  return (
    <Wrapper>
      <PageWrapper>
        <Logo />
        <Nav />
      </PageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  height: ${StyleConstants.NAV_BAR_HEIGHT};
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  -webkit-box-shadow: 0 3px 7px -7px black;
  -moz-box-shadow: 0 3px 7px -7px black;
  box-shadow: 0 3px 7px -7px black;
  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
  }
  ${PageWrapper} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
