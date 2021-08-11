import styled from 'styled-components/macro';

import { APP_NAME } from '../../../constants/strings';

export function Logo() {
  return (
    <Wrapper>
      <Title>{APP_NAME}</Title>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-right: 1rem;
`;
