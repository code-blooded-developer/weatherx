import styled from "styled-components";
import { Input } from "antd";
import { SearchOutlined, AimOutlined } from "@ant-design/icons";

export const SearchBarContainer = styled.div`
  margin-bottom: 2rem;
`;

export const StyledSearchOutlined = styled(SearchOutlined)`
  svg {
    fill: #4a6fa1;
  }
`;

export const StyledAimOutlined = styled(AimOutlined)`
  cursor: pointer;
  svg {
    fill: #4a6fa1;
  }
`;

export const StyledInput = styled(Input)`
  background-color: ${({ theme }) => theme.panelBgColor};
  border-color: ${({ theme }) => theme.panelBgColor};
  input {
    background-color: ${({ theme }) => theme.panelBgColor};
    ::placeholder {
      color: ${({ theme }) => theme.searchInput.placeholderColor};
    }
  }
`;
