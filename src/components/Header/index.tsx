import DarkModeToggle from "react-dark-mode-toggle";
import GithubIcon from "@/assets/github.svg";

import {
  HeaderContainer,
  Title,
  GithubLink,
  HeaderIconsContainer,
} from "./styled";

interface IHeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: (isDarkMode: boolean) => void;
}

const Header: React.FC<IHeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <HeaderContainer>
      <Title>WeatherX</Title>
      <HeaderIconsContainer>
        <DarkModeToggle
          checked={isDarkMode}
          onChange={() => toggleDarkMode(!isDarkMode)}
          size={60}
        />
        <GithubLink
          target="_blank"
          href="https://github.com/code-blooded-developer/weatherx"
        >
          <GithubIcon />
        </GithubLink>
      </HeaderIconsContainer>
    </HeaderContainer>
  );
};

export default Header;
