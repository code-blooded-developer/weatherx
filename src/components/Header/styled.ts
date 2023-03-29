import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8rem;
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  color: #2e5d89;
`;

export const HeaderIconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const GithubLink = styled.a`
  margin-left: 1rem;
  svg {
    fill: ${({ theme }) => theme.appTitleColor};
  }
  &:hover svg {
    fill: #20546a;
  }
`;
