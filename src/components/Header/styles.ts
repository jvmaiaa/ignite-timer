import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;
  };

  a {
    width: 3rem;
    height: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme['gray-100']};

    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;

    &:hover {
      border-bottom: 3px solid ${({ theme }) => theme['green-500']};
    }

    &.active {
      color: ${({ theme }) => theme['green-500']};
    }
  };
`;